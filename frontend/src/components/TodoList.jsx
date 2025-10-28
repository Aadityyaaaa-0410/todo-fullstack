import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo }) {
  return (
    <div className="space-y-2">
      {todos.length === 0 ? (
        <p className="text-center text-gray-400 py-8">No todos yet. Add one above!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))
      )}
    </div>
  );
}

export default TodoList;
