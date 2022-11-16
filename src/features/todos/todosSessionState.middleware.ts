import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  addCategory,
  addTodoItem,
  markTodoItemComplete,
  fetchImageAsync,
} from "./todoSlice";
import todoSessionState from "./todosSessionState";

// Use middleware when side-effects are needed like for persisting todo state to browser storage
const persistStateToSession = createListenerMiddleware();

persistStateToSession.startListening({
  matcher: isAnyOf(
    addCategory,
    addTodoItem,
    markTodoItemComplete,
    fetchImageAsync.fulfilled
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    // @ts-ignore
    todoSessionState.overwriteCategories(state?.todos?.categories || {});
  },
});

export default persistStateToSession;
