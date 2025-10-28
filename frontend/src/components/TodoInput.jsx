import { useState } from "react";

function TodoInput({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task);
      setTask("");
    }
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

export default TodoInput;
