import { Link } from "react-router-dom";
import { Card, Row, Col, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as db from "./Database";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const defaultImageUrl = "/images/reactjs.jpg";
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = db;

  const isFaculty = currentUser?.role === "FACULTY";

  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === currentUser?._id &&
        enrollment.course === course._id
    )
  );

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              className="btn btn-primary float-end ms-2"
              onClick={addNewCourse}
              id="wd-add-new-course-click"
            >
              Add
            </Button>
            <Button
              className="btn btn-warning float-end"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </Button>
          </h5>

          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="Course Description"
            as="textarea"
            rows={3}
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({enrolledCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {enrolledCourses.map((c) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  to={`/Kambaz/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={c.image || defaultImageUrl}
                    variant="top"
                    width="100%"
                    height={160}
                    alt={c.name}
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="primary">Go</Button>

                      {isFaculty && (
                        <div>
                          <Button
                            className="btn btn-warning me-2"
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(c);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            className="btn btn-danger"
                            id="wd-delete-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(c._id);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
