export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>{" "}
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </a>
          <br />
          <span>
            Multiple Modules | Not available until May 6 at 12:00am |{" "}
          </span>
          <strong>Due May 13 at 11:59pm | 100 pts</strong>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </a>
          <br />
          <span>
            Multiple Modules | Not available until May 13 at 12:00am |{" "}
          </span>
          <strong>Due May 20 at 11:59pm | 100 pts</strong>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/125"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </a>
          <br />
          <span>
            Multiple Modules | Not available until May 20 at 12:00am |{" "}
          </span>
          <strong>Due May 27 at 11:59pm | 100 pts</strong>
        </li>
      </ul>
    </div>
  );
}
