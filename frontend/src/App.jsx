import { useEffect, useState } from "react";

function TodoInput({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(task);
    setTask("");
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function TodoList({ todos, deleteTodo }) {
  return (
    <div className="space-y-2">
      {todos.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No todos yet. Add one above!</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-800">{todo.task}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

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
        setTodos([...todos, data]);
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
