import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/nodejs.jpg" width={200} />
            <div>
              <h5> CS1235 Node JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
                <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/angular.jpg" width={200} />
            <div>
              <h5> CS1236 Angular </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>  
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/git.jpg" width={200} />
            <div>
              <h5> CS1237 Git </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/vscode.jpg" width={200} />
            <div>
              <h5> CS1238 Visual Studio Code </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/postman.jpg" width={200} />
            <div>
              <h5> CS1239 Postman </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/mysql.jpg" width={200} />
            <div>
              <h5> CS1240 MySql </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
