import { useState } from "react";
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithArrays() {
  const API = `${REMOTE_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const deleteTodo = async () => {
    try {
      await axios.delete(`${API}/${todo.id}/delete`);
      setErrorMessage(null); // Clear on success
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error deleting todo");
    }
  };

  const updateTodoTitle = async () => {
    try {
      await axios.put(`${API}/${todo.id}/title/${todo.title}`);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error updating title");
    }
  };

  const updateTodoDescription = async () => {
    try {
      await axios.put(`${API}/${todo.id}/description/${todo.description}`);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Error updating description"
      );
    }
  };

  const updateTodoCompleted = async () => {
    try {
      await axios.put(`${API}/${todo.id}/completed/${todo.completed}`);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error updating status");
    }
  };

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <input
        id="wd-todo-id"
        value={todo.id}
        className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      <h3>Deleting from an Array</h3>
      <button className="btn btn-danger float-end" onClick={deleteTodo}>
        Delete Todo with ID = {todo.id}
      </button>
      <input
        value={todo.id}
        className="form-control w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h3>Updating an Item in an Array</h3>
      <div className="d-flex flex-column bd-highlight mb-3">
        <div>
          <button
            className="btn btn-primary float-end"
            onClick={updateTodoTitle}
          >
            Update Todo
          </button>
          <input
            value={todo.id}
            className="form-control w-25 float-start me-2"
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
          <input
            value={todo.title}
            className="form-control w-50 float-start"
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <br />

        <div>
          <button
            className="btn btn-primary float-end"
            onClick={updateTodoDescription}
          >
            Update Todo Description
          </button>
          <input
            value={todo.id}
            className="form-control w-25 float-start me-2"
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
          <input
            value={todo.description}
            className="form-control w-50 float-start"
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </div>
        <br />

        <div>
          <button
            className="btn btn-primary float-end"
            onClick={updateTodoCompleted}
          >
            Update Completed Status
          </button>
          <input
            value={todo.id}
            className="form-control w-25 float-start me-2"
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
          <input
            type="checkbox"
            className="form-check-input float-start"
            id="wd-todo-completed"
            checked={todo.completed}
            onChange={() => setTodo({ ...todo, completed: !todo.completed })}
          />
          <label
            htmlFor="wd-todo-completed"
            className="form-check-label ms-4 float-start"
          >
            {todo.completed ? "True" : "False"}
          </label>
        </div>
      </div>
      <hr />
    </div>
  );
}
