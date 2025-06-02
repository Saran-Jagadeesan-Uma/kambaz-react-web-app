import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database";
import { v4 as uuidv4 } from "uuid";

type Course = {
  _id?: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  editing?: boolean;
  image?: string;
};

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: initialCourses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (
      state,
      { payload: course }: { payload: Omit<Course, "_id"> }
    ) => {
      const newCourse: Course = {
        ...course,
        _id: uuidv4(),
      };
      state.courses.push(newCourse);
    },
    deleteCourse: (state, { payload: courseId }: { payload: string }) => {
      state.courses = state.courses.filter((c) => c._id !== courseId);
    },
    updateCourse: (state, { payload: course }: { payload: Course }) => {
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c
      );
    },
    editCourse: (state, { payload: courseId }: { payload: string }) => {
      state.courses = state.courses.map((c) =>
        c._id === courseId ? { ...c, editing: true } : c
      );
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, editCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
