import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useLocation } from "react-router-dom";

export default function KambazNavigation() {
  const location = useLocation();

  const navItems = [
    { label: "Account", icon: FaRegCircleUser, path: "/Kambaz/Account" },
    { label: "Dashboard", icon: AiOutlineDashboard, path: "/Kambaz/Dashboard" },
    { label: "Courses", icon: LiaBookSolid, path: "/Kambaz/Courses" },
    { label: "Calendar", icon: IoCalendarOutline, path: "/Kambaz/Calendar" },
    { label: "Inbox", icon: FaInbox, path: "/Kambaz/Inbox" },
    { label: "Labs", icon: LiaCogSolid, path: "/labs" },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 start-0 d-none d-md-block bg-black z-2"
    >
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center py-3"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern Logo" />
      </ListGroup.Item>

      {navItems.map(({ label, icon: Icon, path }) => {
        const isActive = location.pathname.startsWith(path);
        const isAccount = label === "Account";

        const backgroundColor = isActive ? "bg-white" : "bg-black";
        const textColor = isActive ? "text-danger" : "text-white";

        let iconColor = "text-danger";
        if (isAccount) {
          iconColor = isActive ? "text-black" : "text-white";
        }

        return (
          <ListGroup.Item
            key={label}
            to={path}
            as={Link}
            className={`text-center border-0 py-3 ${backgroundColor} ${textColor}`}
          >
            <Icon className={`fs-1 ${iconColor}`} />
            <div className="small">{label}</div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
