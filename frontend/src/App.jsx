import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const API_BASE = "http://ff-1740939327.us-east-1.elb.amazonaws.com";

  // Fetch all todos from backend
  useEffect(() => {
    fetch(`${API_BASE}/todos-a`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // Add a new todo
  const addTodo = async (task) => {
    if (!task || task.trim() === "") return;
    try {
      const res = await fetch(`${API_BASE}/add-todo-a`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      const result = await res.json();
      console.log(result);
      setTodos([...todos, { task }]);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Delete a todo by ID
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE}/delete-todo-a/${id}`, { method: "DELETE" });
      setTodos(todos.filter((t) => t.id !== id));
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
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;
