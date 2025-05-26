import { FaSearch, FaPlus } from "react-icons/fa";
import "./styles.css";

export default function AssignmentsControls() {
  return (
    <div className="wd-assignments-controls d-flex justify-content-between align-items-center mb-3">
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          <FaSearch color="grey" />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search for Assignments"
          id="wd-search-assignment"
        />
      </div>
      <div>
        <button className="btn btn-secondary me-2" id="wd-add-assignment-group">
          <FaPlus /> Group
        </button>
        <button className="btn btn-danger" id="wd-add-assignment">
          <FaPlus /> Assignment
        </button>
      </div>
    </div>
  );
}
