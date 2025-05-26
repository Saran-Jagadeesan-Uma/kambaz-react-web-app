import { NavLink, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const to = `/Kambaz/Courses/${cid}/${link}`;

        const id = `wd-course-${link.toLowerCase()}-link`;

        return (
          <NavLink
            key={link}
            to={to}
            id={id}
            className={({ isActive }) =>
              `list-group-item border border-0 ${isActive ? "active" : ""}`
            }
            style={({ isActive }) => ({
              color: isActive ? "black" : "red",
            })}
          >
            {link}
          </NavLink>
        );
      })}
    </div>
  );
}
