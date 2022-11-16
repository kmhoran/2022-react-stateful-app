import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import { RootState, AppThunk } from "../../app/store";
import { fetchRandomCatImage } from "./catsAsAServiceApi";
import { TodoCategory, TodoItem, TodoState } from "./types";
import todosSessionState from "./todosSessionState";

// use Thunk when performing async operations
export const fetchImageAsync = createAsyncThunk(
  "todos/fetchImage",
  async (categoryId: string) => {
    const imageUrl = await fetchRandomCatImage();
    return { categoryId, imageUrl };
  }
);

export const getImage =
  (categoryId: string): AppThunk =>
  (dispatch, getState) => {
    if (getState().todos.status !== "idle") return;
    const category = selectCategoryById(getState())(categoryId);
    if (!category.imageUrl) {
      dispatch(fetchImageAsync(categoryId));
    }
  };

function getInitialState() {
  const defaultState: TodoState = {
    status: "idle",
    categories: { ...todosSessionState.getCategories() },
  };

  return defaultState;
}

export const todoSlice = createSlice({
  name: "todo",
  initialState: getInitialState(),
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      const label = action.payload;
      const categoryId = crypto.randomUUID();
      if (!state.categories[categoryId]) {
        state.categories[categoryId] = {
          label,
          id: categoryId,
          items: [],
          imageUrl: "",
        } as TodoCategory;
      }
    },
    addTodoItem: (
      state,
      action: PayloadAction<{ label: string; categoryId: string }>
    ) => {
      const { label, categoryId } = action.payload;
      if (!!state.categories[categoryId]) {
        const now = new Date().getTime();
        const newItem: TodoItem = {
          label,
          categoryId,
          id: crypto.randomUUID(),
          isComplete: false,
          dateCreated: now,
          dateLastUpdated: now,
        };
        state.categories[categoryId].items.push(newItem);
      }
    },
    markTodoItemComplete: (
      state,
      action: PayloadAction<{ itemId: string; categoryId: string }>
    ) => {
      const { itemId, categoryId } = action.payload;
      const category = state.categories[categoryId];
      if (!!category) {
        const indexOfItem = findIndex(
          category.items,
          (item) => item.id === itemId
        );
        if (indexOfItem >= 0) {
          const now = new Date().getTime();
          category.items[indexOfItem] = {
            ...category.items[indexOfItem],
            dateLastUpdated: now,
            isComplete: true,
          };
          state.categories[categoryId] = category;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImageAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const { categoryId, imageUrl } = action.payload;
        const category = state.categories[categoryId];
        if (!!category) {
          state.categories[categoryId] = { ...category, imageUrl };
        }
      })
      .addCase(fetchImageAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addCategory, addTodoItem, markTodoItemComplete } =
  todoSlice.actions;

export const selectCategories = (state: RootState) => state.todos.categories;
export const selectCategoryById = (state: RootState) => (categoryId) =>
  state.todos.categories[categoryId];

export default todoSlice.reducer;
