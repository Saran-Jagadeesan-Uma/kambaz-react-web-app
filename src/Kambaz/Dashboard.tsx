import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const defaultImageUrl = "/images/reactjs.jpg";

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            Course Editor
            <Button
              className="btn btn-primary float-end ms-2"
              id="wd-add-new-course-click"
              onClick={addCourse}
              disabled={!course.name || !course.description}
            >
              Add
            </Button>
            <Button
              className="btn btn-warning float-end"
              id="wd-update-course-click"
              onClick={updateCourse}
              disabled={!course._id}
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
            as="textarea"
            className="mb-2"
            placeholder="Course Description"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            rows={3}
          />
          <hr />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          Published Courses ({courses.length})
        </h2>
        {!isFaculty && (
          <Button
            className="btn btn-primary"
            onClick={() => setEnrolling(!enrolling)}
          >
            {enrolling ? "Enrolled Courses" : "All Courses"}
          </Button>
        )}
      </div>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c) => {
            const imageUrl = c.image || defaultImageUrl;
            const isEnrolled = Boolean(c.enrolled);

            return (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "350px" }}
              >
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Link
                    to={`/Kambaz/Courses/${c._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      height={200}
                      alt={c.name}
                    />
                    <Card.Body style={{ flexGrow: 1 }}>
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
                    <Link to={`/Kambaz/Courses/${c._id}/Home`}>
                      <Button variant="primary" size="sm">
                        Go
                      </Button>
                    </Link>

                    {isFaculty ? (
                      <div>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => setCourse(c)}
                          id="wd-edit-course-click"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteCourse(c._id)}
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      enrolling && (
                        <Button
                          variant={isEnrolled ? "danger" : "success"}
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            updateEnrollment(c._id, isEnrolled);
                          }}
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      )
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {courses.length === 0 && (
          <p className="text-muted mt-4">
            {enrolling
              ? "No courses available."
              : "You are not enrolled in any courses."}
          </p>
        )}
      </div>
    </div>
  );
}
