import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Course {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  image?: string;
}

interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: [], 
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, action) => {
      const newCourse: Course = {
        _id: uuidv4(),
        name: action.payload.name || "New Course",
        number: action.payload.number || "",
        startDate: action.payload.startDate || "",
        endDate: action.payload.endDate || "",
        description: action.payload.description || "",
        image: action.payload.image || "",
      };
      state.courses.push(newCourse);
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
    },
    updateCourse: (state, action) => {
      state.courses = state.courses.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, setCourses } =
  courseSlice.actions;

export default courseSlice.reducer;
