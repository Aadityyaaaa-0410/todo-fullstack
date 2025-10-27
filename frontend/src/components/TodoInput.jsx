import { useState } from "react";

function TodoInput({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form className="flex gap-3 mb-6 bg-white/90 p-3 rounded-xl shadow-md backdrop-blur">

      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-gray-700"
      />
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-md"
      >
        Add
      </button>
    </form>
  );
}

export default TodoInput;
