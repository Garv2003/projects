import axios from "axios";

async function login(values) {
  try {
    const response = await axios.post("/api/auth/login", values);
    const data = response;
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

async function register(values) {
  try {
    const response = await axios.post("/api/auth/register", values);
    const data = response;
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
}

async function getTodos() {
  try {
    const response = await axios.get("/api/todo");
    return response.data.todos;
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
}

async function postTodo(newTodo) {
  try {
    const response = await axios.post("/api/todo", { title: newTodo });
    return response.data.todo;
  } catch (error) {
    throw new Error("Failed to add todo");
  }
}

const DeleteTodo = async (id) => {
  try {
    const response = await axios.delete(`/api/todo/${id}`);
    return response.data.todo;
  } catch (error) {
    throw new Error("Failed to delete todo");
  }
};

const toggleCompleteTodo = async (id) => {
  try {
    const response = await axios.put(`/api/todo/${id}`);
    return response.data.todo;
  } catch (error) {
    throw new Error("Failed to complete todo");
  }
};

const updateTodo = async ({ id, title }) => {
  try {
    const response = await axios.post(`/api/todo/${id}`, { title });
    return response.data.todo;
  } catch (error) {
    throw new Error("Failed to update todo");
  }
};

export {
  DeleteTodo,
  toggleCompleteTodo,
  updateTodo,
  getTodos,
  postTodo,
  login,
  register,
};
