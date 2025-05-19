import { FaPlus, FaEllipsisV } from "react-icons/fa";
import "./styles.css"

export default function AssignmentControlButtons() {
  return (
    <div className="wd-assignment-control-buttons d-flex align-items-center">
      <span className="me-2 pill">40% of Total</span>
      <button className="btn btn-light btn-sm rounded-circle me-2">
        <FaPlus />
      </button>
      <FaEllipsisV color="grey" />
    </div>
  );
}