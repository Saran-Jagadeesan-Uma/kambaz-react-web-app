import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/Coursereducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import coursesReducer from "./Courses/reducer";
import enrollmentReducer from "./Enrollmentreducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    courses: coursesReducer,
    enrollmentReducer,
  },
});
export default store;
