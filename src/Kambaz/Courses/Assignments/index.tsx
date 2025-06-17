import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAssignment as deleteAssignmentReducer,
  setAssignments,
} from "./reducer";
import * as assignmentsClient from "./client";
import { ListGroup, Row, Col } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { HiOutlinePencilAlt, HiCheckCircle } from "react-icons/hi";

import DeleteAssignmentDialog from "./AssignmentDeleteDialog";
import AssignmentDeleteButton from "./AssignmentDeleteButton";

import LessonControlButtons from "./LessonControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentControlButtons from "./AssignmentControlButtons";

type Assignment = {
  _id: string;
  title: string;
  availableFromDate?: string;
  dueDate?: string;
  points: number;
  course: string;
  description?: string;
};

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) return;

      try {
        setLoading(true);
        setError(null);
        console.log("Fetching assignments for course:", cid);

        const data = await assignmentsClient.findAssignmentsForCourse(cid);
        console.log("Fetched assignments:", data);

        dispatch(setAssignments(data));
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [cid, dispatch]);

  const courseAssignments: Assignment[] = assignments.filter(
    (assignment: Assignment) => assignment.course === cid
  );

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (assignmentToDelete) {
      try {
        await assignmentsClient.deleteAssignment(assignmentToDelete);
        dispatch(deleteAssignmentReducer(assignmentToDelete));
        console.log("Assignment deleted successfully");
      } catch (error) {
        console.error("Error deleting assignment:", error);
        setError("Failed to delete assignment");
      }
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  if (loading) {
    return (
      <div className="wd-assignments p-4">
        <div className="text-center">Loading assignments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wd-assignments p-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="wd-assignments p-4">
      {isFaculty && (
        <AssignmentsControls
          onAddAssignment={() =>
            navigate(`/Kambaz/Courses/${cid}/Assignments/new`)
          }
          onAddGroup={() => {}}
        />
      )}

      <ListGroup id="wd-modules" className="rounded-0">
        <ListGroup.Item
          as="li"
          className="wd-module p-0 mb-4 fs-5 border-bottom border-secondary"
        >
          <div className="d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary text-white">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              Assignments
            </div>
            {isFaculty && <AssignmentControlButtons />}
          </div>

          <ListGroup as="ul" className="wd-lessons rounded-0">
            {courseAssignments.length === 0 ? (
              <ListGroup.Item className="p-3 text-muted">
                No assignments found for this course.
              </ListGroup.Item>
            ) : (
              courseAssignments.map((assignment: Assignment) => {
                const { _id, title, availableFromDate, dueDate, points } =
                  assignment;

                return (
                  <ListGroup.Item
                    as="li"
                    key={_id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <Row className="assignment-item py-3 align-items-center">
                      <Col md={1} className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <HiOutlinePencilAlt className="me-2 fs-3 text-success" />
                      </Col>
                      <Col md={9}>
                        <b className="d-block">
                          <a
                            className="wd-assignment-link text-decoration-none text-black"
                            href={`#/Kambaz/Courses/${cid}/Assignments/${_id}`}
                          >
                            {title}
                          </a>
                        </b>
                        <div className="module-info text-secondary small">
                          <span className="text-danger">Multiple Modules</span>{" "}
                          | <b>Not available until</b>{" "}
                          {formatDate(availableFromDate)} at 12:00 am |{" "}
                          <b>Due</b> {formatDate(dueDate)} at 11:59 pm |{" "}
                          {points} pts
                        </div>
                      </Col>
                      <Col
                        md={2}
                        className="text-end d-flex align-items-center justify-content-end"
                      >
                        {isFaculty && (
                          <>
                            <AssignmentDeleteButton
                              onDelete={() => handleDeleteClick(_id)}
                            />
                          </>
                        )}
                        <HiCheckCircle className="me-3 text-success fs-4" />
                        <LessonControlButtons />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>

      <DeleteAssignmentDialog
        show={showDeleteDialog}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
