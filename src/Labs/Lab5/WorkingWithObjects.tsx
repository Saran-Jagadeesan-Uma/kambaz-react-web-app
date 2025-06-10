import { useState } from "react";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: 1,
    name: "NodeJS Module",
    description: "Module about NodeJS",
    course: "WD",
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <input
        className="form-control w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />

      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />
      <h4>Updating Assignment Score</h4>
      <input
        type="number"
        id="wd-setscore-inp"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            score: parseInt(e.target.value),
          })
        }
        value={assignment.score}
      />

      <a
        style={{ marginLeft: "20px" }}
        className="btn btn-outline-primary"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>

      <br />
      <hr />
      <h4>Updating Complete Status</h4>
      <input
        type="checkbox"
        id="wd-check-inp"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            completed: e.target.checked,
          })
        }
      />

      <a
        style={{ marginLeft: "20px" }}
        className="btn btn-outline-primary"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>

      <br />
      <hr />
      <h4>Retreiving Modules</h4>
      <a
        id="wd-retrieve-module"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module`}
      >
        Get Module
      </a>
      <hr />
      <h4>Retrieving module name </h4>
      <a
        id="wd-retrieve-module"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module/name`}
      >
        Get Module
      </a>
      <hr />
      <h4>Retrieving Module Description</h4>
      <a
        className="
                btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module/description`}
      >
        Get Module Description
      </a>
      <br />
      <hr />
      <h4>Updating Module Name</h4>
      <input
        type="text"
        onChange={(e) =>
          setModule({
            ...module,
            name: e.target.value,
          })
        }
        value={module.name}
      />

      <a
        style={{ marginLeft: "20px" }}
        className="btn btn-primary"
        href={`${MODULE_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>

      <br />
      <hr />
      <h4>Updating Description</h4>
      <input
        className="form-control w-75"
        id="wd-set-desc"
        type="text"
        onChange={(e) =>
          setModule({
            ...module,
            description: e.target.value,
          })
        }
        value={module.description}
      />
      <br />
      <a
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module/description/${module.description}`}
      >
        Update Module Description
      </a>
      <hr />
    </div>
  );
}
