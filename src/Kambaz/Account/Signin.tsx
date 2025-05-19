import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-3">
      <h3 className="mb-3">Sign in</h3>

      <input
        className="form-control mb-2"
        placeholder="username"
        id="wd-username"
      />

      <input
        className="form-control mb-3"
        placeholder="password"
        type="password"
        id="wd-password"
      />

      <Link
        id="wd-signin-btn"
        to="/Kambaz/Dashboard"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </Link>

      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
