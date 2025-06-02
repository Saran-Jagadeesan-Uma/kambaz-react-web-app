import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { enrollments } from "./Database";
import { v4 as uuid } from "uuid";

const initialState = {
  enrollments,
  showAllEnrollments: false
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    toggleEnrollment: (state, action: PayloadAction<{userId: string, courseId: string}>) => {
      const enrolled = state.enrollments.find((enrollment) => enrollment.user === action.payload.userId && enrollment.course === action.payload.courseId)
      if(enrolled) {
        state.enrollments = state.enrollments.filter((enrollment) => enrollment !== enrolled)
      }
      else {
        state.enrollments = [...state.enrollments, {_id: uuid(), user: action.payload.userId, course: action.payload.courseId}]
      }
    },
    toggleShowAllEnrollments: (state) => {
      state.showAllEnrollments = !state.showAllEnrollments
    }
  },
});

export const { toggleEnrollment, toggleShowAllEnrollments } = enrollmentSlice.actions;

export default enrollmentSlice.reducer;