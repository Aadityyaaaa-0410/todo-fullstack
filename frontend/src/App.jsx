import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const API_BASE = "http://ff-1740939327.us-east-1.elb.amazonaws.com";

  useEffect(() => {
    fetch(`${API_BASE}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const addTodo = async (text) => {
    const res = await fetch(`${API_BASE}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
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
