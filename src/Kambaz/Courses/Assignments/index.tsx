import { BsGripVertical } from "react-icons/bs";
import { HiOutlinePencilAlt, HiCheckCircle } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";
import { ListGroup, Row, Col } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControls";

export default function Assignments() {
  return (
    <div className="wd-assignments p-4">
      <AssignmentsControls />
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
            <AssignmentControlButtons />
          </div>

          <ListGroup as="ul" className="wd-lessons rounded-0">
            {[
              {
                id: 123,
                title: "A1 - ENV + HTML",
                modules: "Multiple Modules",
                availableUntil: "Not available until May 6 at 12:00am",
                due: "May 13 at 11:59pm",
                points: 100,
              },
              {
                id: 124,
                title: "A2 - CSS + BOOTSTRAP",
                modules: "Multiple Modules",
                availableUntil: "Not available until May 13 at 12:00am",
                due: "May 20 at 11:59pm",
                points: 100,
              },
              {
                id: 125,
                title: "A3 - JAVASCRIPT + REACT",
                modules: "Multiple Modules",
                availableUntil: "Not available until May 20 at 12:00am",
                due: "May 27 at 11:59pm",
                points: 100,
              },
              {
                id: 456,
                title: "B1 - NODE + EXPRESS",
                modules: "Module 2",
                availableFrom: "Available from Jun 3 at 8:00am",
                due: "Jun 10 at 11:59pm",
                points: 120,
              },
              {
                id: 789,
                title: "C1 - MONGODB + MONGOOSE",
                modules: "Module 3",
                availableFrom: "Available from Jun 10 at 8:00am",
                due: "Jun 17 at 11:59pm",
                points: 150,
              },
              {
                id: 101,
                title: "D1 - DEPLOYMENT",
                modules: "Module 4",
                availableFrom: "Available from Jun 17 at 8:00am",
                due: "Jun 24 at 11:59pm",
                points: 80,
              },
            ].map(
              ({
                id,
                title,
                modules,
                availableUntil,
                availableFrom,
                due,
                points,
              }) => (
                <ListGroup.Item as="li" key={id} className="wd-lesson p-3 ps-1">
                  <Row className="assignment-item py-3 align-items-center">
                    <Col md={1} className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <HiOutlinePencilAlt className="me-2 fs-3 text-success" />
                    </Col>
                    <Col md={9}>
                      <b className="d-block">
                        <a
                          className="wd-assignment-link text-decoration-none text-black"
                          href={`#/Kambaz/Courses/1234/Assignments/${id}`}
                        >
                          {title}
                        </a>
                      </b>
                      <div className="module-info text-secondary small">
                        <span
                          className={
                            modules.includes("Multiple") ? "text-danger" : ""
                          }
                        >
                          {modules}
                        </span>
                        {" | "}
                        {availableUntil && <span>{availableUntil}</span>}
                        {availableFrom && <span>{availableFrom}</span>}
                        <br />
                        <span>
                          <b>Due</b> {due}
                        </span>{" "}
                        | <span> {points} pts</span>
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
            )}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
