import { FaTimesCircle, FaCircle } from "react-icons/fa";

const RedXMark = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => {
  const style: React.CSSProperties = {
    top: "2px",
    fontSize: size ? `${size}px` : "1em",
  };

  return (
    <span className={`me-1 position-relative ${className || ""}`}>
      <FaTimesCircle style={style} className="text-danger position-absolute" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
  );
};

export default RedXMark;
