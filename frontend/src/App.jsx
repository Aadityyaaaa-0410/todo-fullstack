import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const API_BASE = "http://ff-1740939327.us-east-1.elb.amazonaws.com";

  // ✅ Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/todos-a`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
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
      if (res.ok) {
        setTodos([...todos, data.todo]); // use returned todo with id
      } else {
        console.error("Error adding todo:", data.error);
      }
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/delete-todo-a/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTodos(todos.filter((t) => t.id !== id));
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
        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}

export default App;
