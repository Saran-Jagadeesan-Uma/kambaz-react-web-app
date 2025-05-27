import { useParams, Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a) => a._id === aid);

  if (!assignment) {
    return <div className="container mt-5">Assignment not found.</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container mt-5">
      <Form>
        <Form.Group controlId="wd-name" className="mb-4">
          <Form.Label>
            <h3>Assignment Name</h3>
          </Form.Label>
          <Form.Control defaultValue={assignment.title} />
        </Form.Group>

        <Form.Label>
          <h4>Description</h4>
        </Form.Label>
        <div
          className="form-control mb-4"
          style={{ height: "200px", overflowY: "auto", whiteSpace: "pre-wrap" }}
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
          <ul>
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
            <Form.Control defaultValue={assignment.points || 100} />
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
                defaultValue={assignment.due || "2024-05-13"}
              />
            </Form.Group>

            <Row>
              <Col xs={6}>
                <Form.Group controlId="wd-available-from">
                  <Form.Label>Available from</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={assignment.availableFrom || "2024-05-06"}
                  />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group controlId="wd-available-until">
                  <Form.Label>Available until</Form.Label>
                  <Form.Control type="date" />
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
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="danger" type="submit">
              Save
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
