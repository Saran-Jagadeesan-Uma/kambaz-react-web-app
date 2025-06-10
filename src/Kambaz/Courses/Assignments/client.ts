import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_URL = `${REMOTE_SERVER}/api/assignments`;

export const findAllAssignments = async () => {
  const { data } = await axios.get(ASSIGNMENTS_URL);
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_URL}/${assignmentId}`);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(
    `${ASSIGNMENTS_URL}/${assignment._id}`,
    assignment
  );
  return data;
};

export const createAssignment = async (assignment: any) => {
  const { data } = await axios.post(ASSIGNMENTS_URL, assignment);
  return data;
};
