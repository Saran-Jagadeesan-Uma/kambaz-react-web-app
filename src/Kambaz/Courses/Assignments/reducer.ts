import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Assignment {
  _id?: string; // Made optional to handle new assignments
  title: string;
  description?: string;
  points: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntil?: string;
  course: string;
}

// Interface for assignments that definitely have an ID (from database)
export interface SavedAssignment extends Assignment {
  _id: string;
}

export interface AssignmentsState {
  assignments: SavedAssignment[]; // Use SavedAssignment since these come from DB
  currentAssignment: Assignment | null;
}

const initialState: AssignmentsState = {
  assignments: [],
  currentAssignment: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<SavedAssignment[]>) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, action: PayloadAction<Assignment>) => {
      // For new assignments, we'll add them with a temporary ID
      // The backend will assign the real ID
      const newAssignment: SavedAssignment = {
        ...action.payload,
        _id: action.payload._id || `temp-${Date.now()}`, // Temporary ID if not provided
      };
      state.assignments.push(newAssignment);
    },

    editAssignment: (state, action: PayloadAction<SavedAssignment>) => {
      const index = state.assignments.findIndex(
        (assignment) => assignment._id === action.payload._id
      );
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    },

    updateAssignment: (
      state,
      action: PayloadAction<Partial<SavedAssignment> & { _id: string }>
    ) => {
      const index = state.assignments.findIndex(
        (assignment) => assignment._id === action.payload._id
      );
      if (index !== -1) {
        state.assignments[index] = {
          ...state.assignments[index],
          ...action.payload,
        };
      }
    },

    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },

    setCurrentAssignment: (state, action: PayloadAction<Assignment | null>) => {
      state.currentAssignment = action.payload;
    },

    clearAssignments: (state) => {
      state.assignments = [];
      state.currentAssignment = null;
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  editAssignment,
  updateAssignment,
  deleteAssignment,
  setCurrentAssignment,
  clearAssignments,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
