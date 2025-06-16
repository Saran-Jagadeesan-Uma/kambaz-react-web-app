import { Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Account from "./Account";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import PeopleTable from "./Courses/People/Table";
import Dashboard from "./Dashboard";
import "./styles.css";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";

export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const findCoursesForUser = async () => {
    try {
      const userCourses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(userCourses);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const updatedCourses = allCourses.map((course: any) => {
        const enrolled = enrolledCourses.find((c: any) => c._id === course._id);
        return { ...course, enrolled: !!enrolled };
      });
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };

  const addCourse = async () => {
    try {
      const newCourse = await courseClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses((prevCourses) =>
        prevCourses.map((c) => (c._id === course._id ? course : c))
      );
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }

      await fetchCourses();
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addCourse={addCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/People" element={<PeopleTable />} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
