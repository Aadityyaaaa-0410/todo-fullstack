import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = "http://ff-1740939327.us-east-1.elb.amazonaws.com";

  // ✅ Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/todos-a`);
      const data = await res.json();
      console.log("Fetched todos:", data);
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ✅ Add new todo
  const addTodo = async (task) => {
    if (!task || task.trim() === "") return;
    try {
      const res = await fetch(`${API_BASE}/add-todo-a`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      const data = await res.json();
      console.log("Added todo response:", data);
      if (res.ok) {
        // Refresh the list to get the correct data from server
        fetchTodos();
      } else {
        console.error("Error adding todo:", data.error);
      }
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    console.log("Attempting to delete todo with id:", id);
    try {
      const res = await fetch(`${API_BASE}/delete-todo-a/${id}`, {
        method: "DELETE",
      });
      console.log("Delete response status:", res.status);
      if (res.ok) {
        // Refresh the list after delete
        fetchTodos();
      } else {
        const errorData = await res.json();
        console.error("Error deleting todo:", errorData);
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-400 to-purple-500 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-11/12 sm:w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Todo App
        </h1>
        <TodoInput addTodo={addTodo} />
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <TodoList todos={todos} deleteTodo={deleteTodo} />
        )}
      </div>
    </div>
  );
}

export default App;
