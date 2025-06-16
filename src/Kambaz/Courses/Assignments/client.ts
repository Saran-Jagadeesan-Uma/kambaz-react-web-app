import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const createAssignment = async (assignment: any) => {
  try {
    console.log("Creating assignment:", assignment);
    const { data } = await axiosWithCredentials.post(
      ASSIGNMENTS_API,
      assignment
    );
    return data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

export const findAllAssignments = async () => {
  try {
    const { data } = await axiosWithCredentials.get(ASSIGNMENTS_API);
    return data;
  } catch (error) {
    console.error("Error fetching all assignments:", error);
    throw error;
  }
};

export const findAssignmentsForCourse = async (courseId: string) => {
  try {
    console.log("Fetching assignments for course:", courseId);
    const { data } = await axiosWithCredentials.get(
      `${REMOTE_SERVER}/api/courses/${courseId}/assignments`
    );
    return data;
  } catch (error) {
    console.error("Error fetching course assignments:", error);
    throw error;
  }
};

export const findAssignmentById = async (assignmentId: string) => {
  try {
    const { data } = await axiosWithCredentials.get(
      `${ASSIGNMENTS_API}/${assignmentId}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching assignment:", error);
    throw error;
  }
};

export const updateAssignment = async (assignment: any) => {
  try {
    console.log("Updating assignment:", assignment);
    const { data } = await axiosWithCredentials.put(
      `${ASSIGNMENTS_API}/${assignment._id}`,
      assignment
    );
    return data;
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw error;
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  try {
    console.log("Deleting assignment:", assignmentId);
    await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
};
