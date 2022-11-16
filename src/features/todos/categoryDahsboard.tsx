import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCategories, addCategory } from "./todoSlice";
import { TodoCategory } from "./types";
import styles from "./todos.module.scss";

export default function CategoryDashboard() {
  const categories = useAppSelector(selectCategories);

  return (
    <div className={styles.dashboard}>
      <br />
      <AddCategoryForm />
      <br />
      <div className={styles.categoryList}>
        {Object.values(categories).map((category, index) => (
          <CategoryCard category={category} key={index} />
        ))}
      </div>
    </div>
  );
}

function AddCategoryForm() {
  const dispatch = useAppDispatch();
  const [newCategoryName, updateNewCategoryName] = useState("");

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    if (!newCategoryName) return;
    dispatch(addCategory(newCategoryName));
    updateNewCategoryName("");
  };
  return (
    <form className={styles.simpleForm} onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder={"Add new Todo Category..."}
        onChange={(event) => updateNewCategoryName(event.target.value)}
        value={newCategoryName}
      />
      <input type="submit" value="Add" disabled={!newCategoryName} />
    </form>
  );
}

function CategoryCard(props: { category: TodoCategory }) {
  return (
    <NavLink className={styles.categoryCard} to={`/todo/${props.category.id}`}>
      {props.category.label}
    </NavLink>
  );
}
