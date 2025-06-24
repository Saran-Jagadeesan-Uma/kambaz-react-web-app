import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams, useLocation } from "react-router-dom";
import PeopleDetails from "./Details";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  const { uid } = useParams();
  const location = useLocation();

  const isAccountUsersPage = location.pathname.includes(
    "/Kambaz/Account/Users"
  );

  return (
    <div id="wd-people-table" className="p-3">
      {isAccountUsersPage && uid && <PeopleDetails />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users
              .filter((user) => user && user._id)
              .map((user) => (
                <tr key={user._id}>
                  <td className="wd-full-name text-nowrap">
                    {isAccountUsersPage ? (
                      <Link
                        to={`/Kambaz/Account/Users/${user._id}`}
                        className="text-decoration-none"
                      >
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">
                          {user.firstName}
                        </span>{" "}
                        <span className="wd-last-name">{user.lastName}</span>
                      </Link>
                    ) : (
                      <>
                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                        <span className="wd-first-name">
                          {user.firstName}
                        </span>{" "}
                        <span className="wd-last-name">{user.lastName}</span>
                      </>
                    )}
                  </td>
                  <td className="wd-login-id">{user.loginId}</td>
                  <td className="wd-section">{user.section}</td>
                  <td className="wd-role">{user.role}</td>
                  <td className="wd-last-activity">{user.lastActivity}</td>
                  <td className="wd-total-activity">{user.totalActivity}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No users enrolled in this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
