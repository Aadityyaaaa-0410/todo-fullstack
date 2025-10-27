function TodoItem({ todo, deleteTodo }) {
  return (
    <li className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      <span className="text-gray-800">{todo.text}</span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-1 rounded-md hover:opacity-90 shadow-sm"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
