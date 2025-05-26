import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-3">
      <h3 className="mb-3">Sign up</h3>

      <input
        placeholder="username"
        className="form-control mb-2"
        id="wd-username"
      />
      <input
        placeholder="password"
        type="password"
        className="form-control mb-2"
        id="wd-password"
      />
      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-3"
        id="wd-password-verify"
      />

      <Link
        to="/Kambaz/Account/Profile"
        className="btn btn-primary w-100 mb-2"
        id="wd-signup-btn"
      >
        Sign up
      </Link>

      <Link to="/Kambaz/Account/Signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
