import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, navigate]);

  return (
    <div id="wd-profile-screen" className="p-3">
      <h3 className="mb-3">Profile</h3>

      {profile && (
        <>
          <FormControl
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            className="mb-2"
            placeholder="username"
            id="wd-username"
          />
          <FormControl
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            className="mb-2"
            placeholder="password"
            type="password"
            id="wd-password"
          />
          <FormControl
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            className="mb-2"
            placeholder="First Name"
            id="wd-firstname"
          />
          <FormControl
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            className="mb-2"
            placeholder="Last Name"
            id="wd-lastname"
          />
          <FormControl
            value={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            className="mb-2"
            type="date"
            id="wd-dob"
          />
          <FormControl
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="mb-2"
            type="email"
            placeholder="Email"
            id="wd-email"
          />
          <select
            value={profile.role}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="form-control mb-3"
            id="wd-role"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <Button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
            id="wd-update-profile-btn"
          >
            Update
          </Button>

          <Button
            onClick={signout}
            className="btn btn-danger w-100"
            id="wd-signout-btn"
          >
            Sign out
          </Button>
        </>
      )}
    </div>
  );
}
