function TodoItem({ todo, deleteTodo }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <span className="text-gray-800 flex-1">{todo.task || todo.title || "Untitled"}</span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
