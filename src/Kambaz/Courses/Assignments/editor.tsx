import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );
  const account = useSelector((state: any) => state.accountReducer.currentUser);

  const isEditing = aid !== "new";
  const existingAssignment = isEditing
    ? assignments.find((a: any) => a._id === aid)
    : null;

  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: "",
    availableUntil: "",
    course: cid || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && existingAssignment) {
      setAssignment({
        title: existingAssignment.title || "",
        description: existingAssignment.description || "",
        points: existingAssignment.points || 100,
        dueDate: existingAssignment.dueDate || "",
        availableFromDate: existingAssignment.availableFromDate || "",
        availableUntil: existingAssignment.availableUntil || "",
        course: existingAssignment.course || cid || "",
      });
    }
  }, [isEditing, existingAssignment, cid]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && aid) {
        const updatedAssignment = await assignmentsClient.updateAssignment({
          ...assignment,
          _id: aid,
        });
        dispatch(updateAssignment(updatedAssignment));
        console.log("Assignment updated successfully");
      } else {
        const newAssignmentData = {
          ...assignment,
          _id: `temp-${Date.now()}`,
        };
        const createdAssignment = await assignmentsClient.createAssignment(
          newAssignmentData
        );
        dispatch(addAssignment(createdAssignment));
        console.log("Assignment created successfully");
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Error saving assignment:", err);
      setError("Failed to save assignment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFaculty = account?.role?.toUpperCase() === "FACULTY";

  if (!isFaculty) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-danger">Access Denied</h3>
        <p>You must be a faculty member to access this page.</p>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="container mt-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Form onSubmit={handleSave}>
        <Form.Group controlId="wd-name" className="mb-4">
          <Form.Label>
            <h3>Assignment Name</h3>
          </Form.Label>
          <Form.Control
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="wd-description" className="mb-4">
          <Form.Label>
            <h4>Description</h4>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            placeholder="Enter assignment description..."
          />
        </Form.Group>

        <div
          className="form-control mb-4"
          style={{ height: "auto", padding: "1rem", overflowY: "auto" }}
        >
          The assignment is{" "}
          <a
            href="https://docs.google.com/document/d/1R7IuxYxmtciUQ0SQC0msNl1g_Fa_Yp-u9cV3zPdCcsY/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "red", textDecoration: "none" }}
          >
            available online
          </a>
          .<br />
          Submit a link to the landing page of your Web application running on
          Netlify.
          <br />
          The landing page should include the following:
          <ul className="mt-2 mb-2">
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>Link to the Kambaz application</li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          The Kambaz application should include a link to navigate back to the
          landing page.
        </div>

        <Form.Group as={Row} className="mb-4" controlId="wd-points">
          <Form.Label column lg={4} className="text-lg-end">
            Points
          </Form.Label>
          <Col lg={8}>
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: parseInt(e.target.value) || 0,
                })
              }
              min="0"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4" controlId="wd-groups">
          <Form.Label column lg={4} className="text-lg-end">
            Assignment Group
          </Form.Label>
          <Col lg={8}>
            <Form.Select defaultValue="1" className="mb-3">
              <option value="1">ASSIGNMENTS</option>
              <option value="2">LABS</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4" controlId="wd-display-grade-as">
          <Form.Label column lg={4} className="text-lg-end">
            Display Grade as
          </Form.Label>
          <Col lg={8}>
            <Form.Select defaultValue="1" className="mb-3">
              <option value="1">PERCENTAGES</option>
              <option value="2">MARKS</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4" controlId="wd-submission-type">
          <Form.Label column lg={4} className="text-lg-end">
            Submission Type
          </Form.Label>
          <Col lg={8} className="border border-1 p-2 rounded">
            <Form.Select defaultValue="1" className="mb-4">
              <option value="1">ONLINE</option>
              <option value="2">OFFLINE</option>
            </Form.Select>

            <p>
              <b>Online Entry Options</b>
            </p>
            {[
              { id: "wd-text-entry", label: "Text entry" },
              { id: "wd-website-url", label: "Website URL" },
              { id: "wd-media-recordings", label: "Media Recordings" },
              { id: "wd-student-annotation", label: "Student Annotations" },
              { id: "wd-file-upload", label: "File Upload" },
            ].map(({ id, label }) => (
              <Form.Check
                key={id}
                type="checkbox"
                id={id}
                label={label}
                className="mb-2"
              />
            ))}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4" controlId="wd-assign">
          <Form.Label column lg={4} className="text-lg-end">
            Assign
          </Form.Label>
          <Col lg={8} className="border border-2 p-2 rounded">
            <Form.Group controlId="wd-assign-to" className="mb-4">
              <Form.Label>Assign to</Form.Label>
              <Form.Control defaultValue="Everyone" />
            </Form.Group>

            <Form.Group controlId="wd-due-date" className="mb-4">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="date"
                value={assignment.dueDate}
                onChange={(e) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Col xs={6}>
                <Form.Group controlId="wd-available-from">
                  <Form.Label>Available from</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.availableFromDate}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableFromDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="wd-available-until">
                  <Form.Label>Available until</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.availableUntil}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntil: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <hr />

        <div className="d-flex justify-content-end">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary" className="me-2" type="button">
              Cancel
            </Button>
          </Link>
          <Button variant="danger" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
