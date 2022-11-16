import CategoryDashboard from "../features/todos/categoryDahsboard";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

export default function HomePage() {
  const categoryCount = useAppSelector(
    (state: RootState) => Object.keys(state.todos.categories).length
  );
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo Site ({categoryCount})</h1>
        <CategoryDashboard />
      </header>
    </div>
  );
}
