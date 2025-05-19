import { NavLink } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <div className="list-group-item fw-bold text-uppercase border border-0 bg-light">
        Account
      </div>
      <NavLink
        to="/Kambaz/Account/Signin"
        id="wd-account-signin-link"
        className={({ isActive }) =>
          `list-group-item border border-0 ${isActive ? "active" : ""}`
        }
        style={({ isActive }) => ({
          color: isActive ? "black" : "red",
        })}
      >
        Signin
      </NavLink>
      <NavLink
        to="/Kambaz/Account/Signup"
        id="wd-account-signup-link"
        className={({ isActive }) =>
          `list-group-item border border-0 ${isActive ? "active" : ""}`
        }
        style={({ isActive }) => ({
          color: isActive ? "black" : "red",
        })}
      >
        Signup
      </NavLink>
      <NavLink
        to="/Kambaz/Account/Profile"
        id="wd-account-profile-link"
        className={({ isActive }) =>
          `list-group-item border border-0 ${isActive ? "active" : ""}`
        }
        style={({ isActive }) => ({
          color: isActive ? "green" : "red",
        })}
      >
        Profile
      </NavLink>
    </div>
  );
}
