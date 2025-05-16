import { useState } from "react";

export default function Modules() {
  const [collapsed, setCollapsed] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const handleCollapseAll = () => {
    setCollapsed(true);
  };

  const handleViewProgress = () => {
    setShowProgress(!showProgress);
  };

  return (
    <div>
      <button onClick={handleCollapseAll}>Collapse All</button>
      <button onClick={handleViewProgress}>View Progress</button>

      {showProgress && (
        <div>
          <p>Progress: 1/3 weeks completed</p>
        </div>
      )}

      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          {!collapsed && (
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">
                    Introduction to the course
                  </li>
                  <li className="wd-content-item">
                    Learn what is Web Development
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          {!collapsed && (
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">CONTENT</span>
                <ul className="wd-content">
                  <li className="wd-content-item">HTML Basics</li>
                  <li className="wd-content-item">DOM Manipulation</li>
                </ul>
              </li>
            </ul>
          )}
        </li>

        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          {!collapsed && (
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">TOPICS</span>
                <ul className="wd-content">
                  <li className="wd-content-item">React Components</li>
                  <li className="wd-content-item">State and Props</li>
                </ul>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
