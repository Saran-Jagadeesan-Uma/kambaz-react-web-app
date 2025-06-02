import { FaSearch, FaPlus } from "react-icons/fa";
import "./styles.css";

type Props = {
  onAddAssignment: () => void;
  onAddGroup: () => void;
};

export default function AssignmentsControls({
  onAddAssignment,
  onAddGroup,
}: Props) {
  return (
    <div className="wd-assignments-controls d-flex justify-content-between align-items-center mb-3">
      <div className="input-group" style={{ width: "300px" }}>
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
        <button
          className="btn btn-secondary me-2"
          id="wd-add-assignment-group"
          onClick={onAddGroup}
        >
          <FaPlus /> Group
        </button>
        <button
          className="btn btn-danger"
          id="wd-add-assignment"
          onClick={onAddAssignment}
        >
          <FaPlus /> Assignment
        </button>
      </div>
    </div>
  );
}
