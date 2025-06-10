import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import "./styles.css";
import { useSelector } from "react-redux";
import Courses from "./Courses";
import ProtectedRoute from "./Account/ProtectedRoute";

export default function Kambaz() {
  const courses = useSelector((state: any) => state.courses.courses);

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route
            path="Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="Courses/:cid/*"
            element={
              <ProtectedRoute>
                <Courses courses={courses} />
              </ProtectedRoute>
            }
          />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
