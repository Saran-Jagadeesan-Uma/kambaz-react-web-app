import { FaTrash } from "react-icons/fa";

type Props = {
  onDelete: () => void;
};

export default function AssignmentDeleteButton({ onDelete }: Props) {
  return (
    <button
      className="btn btn-outline-danger btn-sm me-2"
      onClick={onDelete}
      title="Delete Assignment"
    >
      <FaTrash />
    </button>
  );
}
