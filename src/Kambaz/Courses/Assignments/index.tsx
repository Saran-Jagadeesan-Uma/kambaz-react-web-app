import { useParams } from "react-router";
import { ListGroup, Row, Col } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { HiOutlinePencilAlt, HiCheckCircle } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";
import { useSelector } from "react-redux";

import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();

  const assignments = db.assignments.filter(
    (assignment) => assignment.course === cid
  );

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="wd-assignments p-4">
      {/* Only FACULTY can see assignment creation controls */}
      {isFaculty && <AssignmentsControls />}
      <br />
      <br />
      <br />
      <br />
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
            {assignments.length === 0 ? (
              <ListGroup.Item className="p-3 text-muted">
                No assignments found for this course.
              </ListGroup.Item>
            ) : (
              assignments.map(
                ({
                  _id,
                  title,
                  availableFrom,
                  due,
                  points,
                }) => (
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
                          <span className="text-danger">Multiple Modules</span> |{" "}
                          <b>Not available until</b>{" "}
                          {new Date(availableFrom).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}{" "}
                          at 12:00 am | <b>Due</b>{" "}
                          {new Date(due).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}{" "}
                          at 11:59 pm | {points} pts
                        </div>
                      </Col>
                      <Col
                        md={2}
                        className="text-end d-flex align-items-center justify-content-end"
                      >
                        <HiCheckCircle className="me-3 text-success fs-4" />
                        <FaEllipsisV className="text-secondary fs-5" />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              )
            )}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
