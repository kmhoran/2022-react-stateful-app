import { NavLink, useParams } from "react-router-dom";
import TodoItemsDashboard from "../features/todos/todoItemsDashboard";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

export default function TodoItemPage() {
  const { todoCategoryId } = useParams();

  if (!todoCategoryId)
    throw new Error(`Could not find the page you were looking for.`);

  const category = useAppSelector(
    (state: RootState) => state.todos.categories[todoCategoryId]
  );

  if (!category)
    throw new Error(`cannot find todo Category '${todoCategoryId}'`);

  return (
    <div>
      <NavLink to={"/"}>Home</NavLink>
      <hr />
      <header className="App-header">
        <h1>{category.label}</h1>
        <TodoItemsDashboard categoryId={todoCategoryId} />
      </header>
    </div>
  );
}
