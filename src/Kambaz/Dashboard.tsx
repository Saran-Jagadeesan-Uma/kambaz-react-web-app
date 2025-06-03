import { Link as ReactRouterLink } from "react-router-dom";
import { Card, Row, Col, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  deleteCourse,
  updateCourse,
  editCourse,
} from "./Courses/reducer";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

interface Course {
  _id?: string;
  name: string;
  description: string;
  image?: string;
}

interface Enrollment {
  user: string;
  course: string;
}

interface CurrentUser {
  _id: string;
  role: string;
}

interface RootState {
  accountReducer: {
    currentUser: CurrentUser | null;
  };
  enrollmentReducer: {
    enrollments: Enrollment[];
    showAllEnrollments: boolean;
  };
  courses: {
    courses: Course[];
  };
}

export default function Dashboard() {
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const { enrollments, showAllEnrollments } = useSelector(
    (state: RootState) => state.enrollmentReducer
  );
  const courses = useSelector((state: RootState) => state.courses.courses);

  const isFaculty = currentUser?.role === "FACULTY";

  const [editingCourse, setEditingCourse] = useState<Course>({
    name: "New Course",
    description: "New Description",
  });

  const prevCoursesLength = useRef<number>(courses.length);

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

  const handleAddNewCourse = () => {
    dispatch(addCourse(editingCourse));
    setEditingCourse({ name: "", description: "" });
  };

  const handleUpdateCourse = () => {
    if (!editingCourse._id) return;
    dispatch(updateCourse(editingCourse));
    setEditingCourse({ name: "", description: "" });
  };

  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
    if (course._id) {
      dispatch(editCourse(course._id));
    }
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingCourse({ ...editingCourse, name: e.target.value });
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditingCourse({ ...editingCourse, description: e.target.value });
  };

  useEffect(() => {
    if (courses.length > prevCoursesLength.current) {
      const newCourse = courses[courses.length - 1];
      if (newCourse && currentUser && isFaculty) {
        dispatch({
          type: "enrollment/toggleEnrollment",
          payload: {
            userId: currentUser._id,
            courseId: newCourse._id!,
          },
        });
      }
    }
    prevCoursesLength.current = courses.length;
  }, [courses, currentUser, dispatch]);

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
              onClick={handleAddNewCourse}
              id="wd-add-new-course-click"
            >
              Add
            </Button>
            <Button
              className="btn btn-warning float-end"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
              disabled={!editingCourse._id}
            >
              Update
            </Button>
          </h5>

          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={editingCourse.name}
            onChange={onNameChange}
          />
          <FormControl
            className="mb-2"
            placeholder="Course Description"
            as="textarea"
            rows={3}
            value={editingCourse.description}
            onChange={onDescriptionChange}
          />
          <hr />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          Published Courses ({filteredCourses.length})
        </h2>

        {!isFaculty && (
          <Button
            onClick={() =>
              dispatch({ type: "enrollment/toggleShowAllEnrollments" })
            }
            variant="primary"
          >
            {showAllEnrollments ? "Show Enrolled Only" : "Show All Courses"}
          </Button>
        )}
      </div>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((c: Course) => {
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
                  <ReactRouterLink
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
                  </ReactRouterLink>

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
                          onClick={() => handleEditClick(c)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => dispatch(deleteCourse(c._id!))}
                        >
                          Delete
                        </Button>
                      </div>
                    )}

                    {!isFaculty && (
                      <Button
                        variant={isEnrolled ? "danger" : "success"}
                        size="sm"
                        className="ms-2"
                        onClick={() =>
                          dispatch({
                            type: "enrollment/toggleEnrollment",
                            payload: {
                              userId: currentUser!._id,
                              courseId: c._id!,
                            },
                          })
                        }
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </Button>
                    )}
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
