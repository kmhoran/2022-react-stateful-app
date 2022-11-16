import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectCategoryById,
  addTodoItem,
  markTodoItemComplete,
  getImage,
  fetchImageAsync,
} from "./todoSlice";
import { TodoItem } from "./types";
import styles from "./todos.module.scss";

export default function TodoItemsDashboard(props: { categoryId: string }) {
  const parentCategory = useAppSelector(selectCategoryById)(props.categoryId);
  const dispatch = useAppDispatch();
  dispatch(getImage(props.categoryId));
  const hasCompletedItems = parentCategory.items.some(
    (item) => item.isComplete
  );

  return (
    <div className={styles.dashboard}>
      {parentCategory.imageUrl && (
        <img
          src={parentCategory.imageUrl}
          height="300"
          width="300"
          onClick={() => dispatch(fetchImageAsync(props.categoryId))}
        />
      )}
      <br />
      <AddItemForm parentCategoryId={props.categoryId} />
      <br />
      <div className={styles.categoryList}>
        {parentCategory.items
          .filter((item) => !item.isComplete)
          .map((item, index) => (
            <ItemCard item={item} key={index} />
          ))}
      </div>
      {hasCompletedItems && (
        <div>
          <hr />
          <h3>Complete</h3>
          <div className={styles.categoryList}>
            {parentCategory.items
              .filter((item) => item.isComplete)
              .map((item, index) => (
                <ItemCard item={item} key={index} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AddItemForm(props: { parentCategoryId: string }) {
  const dispatch = useAppDispatch();
  const [newItemName, updateNewItemName] = useState("");

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    if (!newItemName) return;
    dispatch(
      addTodoItem({ label: newItemName, categoryId: props.parentCategoryId })
    );
    updateNewItemName("");
  };
  return (
    <form className={styles.simpleForm} onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder={"Add new Todo Item..."}
        onChange={(event) => updateNewItemName(event.target.value)}
        value={newItemName}
      />
      <input type="submit" value="Add" disabled={!newItemName} />
    </form>
  );
}

function ItemCard(props: { item: TodoItem }) {
  const { isComplete, label, id, categoryId } = props.item;

  const dispatch = useAppDispatch();
  const handleMarkComplete = () => {
    dispatch(
      markTodoItemComplete({
        itemId: id,
        categoryId,
      })
    );
  };

  const cardStyle = `${styles.itemCard} ${
    isComplete ? styles.itemComplete : ""
  }`;
  return (
    <div className={cardStyle}>
      <p>{label}</p>
      {!isComplete && (
        <button onClick={handleMarkComplete}>Mark Complete</button>
      )}
    </div>
  );
}
