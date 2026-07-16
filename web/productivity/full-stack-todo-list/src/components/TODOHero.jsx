function TODOHero({ todos, total_todos }) {
  const todos_completed = todos?.filter((todo) => todo.completed).length;
  return (
    <section className="todohero_section">
      <div>
        <p className="text_large">Task Done</p>
        <p className="text_small">Keep it up</p>
      </div>
      <div>
        {todos_completed}/{total_todos}
      </div>
    </section>
  );
}

export default TODOHero;
