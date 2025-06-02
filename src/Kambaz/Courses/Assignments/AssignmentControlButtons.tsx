import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

export default function AssignmentControlButtons() {
  const navigate = useNavigate();
  const { cid } = useParams();

  function handleAddClick() {
    navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
  }

  return (
    <div className="wd-assignment-control-buttons d-flex align-items-center">
      <span className="me-2 pill">40% of Total</span>
      <button
        className="btn btn-light btn-sm rounded-circle me-2"
        onClick={handleAddClick}
      >
        <FaPlus />
      </button>
      <FaEllipsisV color="grey" />
    </div>
  );
}
