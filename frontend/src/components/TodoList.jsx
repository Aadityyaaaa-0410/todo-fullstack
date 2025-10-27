import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo }) {
  if (!todos.length) {
    return (
      <p className="text-gray-500 text-center italic mt-4">
        No tasks yet — add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
