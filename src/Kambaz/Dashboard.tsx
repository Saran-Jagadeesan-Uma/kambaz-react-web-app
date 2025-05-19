import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = [
    {
      id: 1234,
      title: "CS1234 React JS",
      description: "Full Stack software developer",
      image: "/images/reactjs.jpg",
    },
    {
      id: 1235,
      title: "CS1235 Node JS",
      description: "Full Stack software developer",
      image: "/images/nodejs.jpg",
    },
    {
      id: 1236,
      title: "CS1236 Angular",
      description: "Full Stack software developer",
      image: "/images/angular.jpg",
    },
    {
      id: 1237,
      title: "CS1237 Git",
      description: "Full Stack software developer",
      image: "/images/git.jpg",
    },
    {
      id: 1238,
      title: "CS1238 Visual Studio Code",
      description: "Full Stack software developer",
      image: "/images/vscode.jpg",
    },
    {
      id: 1239,
      title: "CS1239 Postman",
      description: "Full Stack software developer",
      image: "/images/postman.jpg",
    },
    {
      id: 1240,
      title: "CS1240 MySql",
      description: "Full Stack software developer",
      image: "/images/mysql.jpg",
    },
  ];

  return (
    <div id="wd-dashboard" className="ps-md-5 pe-md-3 pt-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published" className="mb-3">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4 mb-4">
          {courses.map((course) => (
            <Col
              key={course.id}
              className="wd-dashboard-course"
              style={{ width: "320px" }}
            >
              <Card className="h-100" style={{ borderRadius: "10px" }}>
                <Link
                  to={`/Kambaz/Courses/${course.id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={course.image}
                    width="100%"
                    height={160}
                    style={{ objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden mb-2">
                      {course.title}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden mb-auto"
                      style={{ height: "auto" }}
                    >
                      {course.description}
                    </Card.Text>
                    <div className="mt-3">
                      <Button variant="primary" style={{ borderRadius: "5px" }}>Go</Button>
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