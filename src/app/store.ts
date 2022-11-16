import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todoSlice";
import todoSessionStateMiddleware from "../features/todos/todosSessionState.middleware";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoSessionStateMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
