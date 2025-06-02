import { Link } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";
import { Card, Row, Col, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleEnrollment, toggleShowAllEnrollments } from "./Enrollmentreducer";

type Enrollment = {
  user: string;
  course: string;
};

type Course = {
  _id: string;
  name: string;
  description: string;
  image?: string;
};

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: Course[];
  course: Course;
  setCourse: (course: Course) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments, showAllEnrollments } = useSelector(
    (state: any) => state.enrollmentReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  const filteredCourses = showAllEnrollments
    ? courses
    : courses.filter((course) =>
        enrollments.some(
          (enrollment: Enrollment) =>
            enrollment.user === currentUser?._id &&
            enrollment.course === course._id
        )
      );

  const defaultImageUrl = "/images/reactjs.jpg";

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

      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          Published Courses ({filteredCourses.length})
        </h2>
        <Button onClick={() => dispatch(toggleShowAllEnrollments())}>
          {showAllEnrollments ? "Show Enrolled Only" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((c) => {
            const isEnrolled = enrollments.some(
              (enrollment: Enrollment) =>
                enrollment.user === currentUser?._id &&
                enrollment.course === c._id
            );
            return (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  {/* Only the image and title link to course home */}
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
                    </Card.Body>
                  </Link>

                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="primary"
                      size="sm"
                      as={ReactRouterLink as any}
                      to={`/Kambaz/Courses/${c._id}/Home`}
                    >
                      Go
                    </Button>
                    {isFaculty && (
                      <div>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => setCourse(c)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteCourse(c._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}

                    <Button
                      variant={isEnrolled ? "danger" : "success"}
                      size="sm"
                      className="ms-2"
                      onClick={() =>
                        dispatch(
                          toggleEnrollment({
                            userId: currentUser._id,
                            courseId: c._id,
                          })
                        )
                      }
                    >
                      {isEnrolled ? "Unenroll" : "Enroll"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
