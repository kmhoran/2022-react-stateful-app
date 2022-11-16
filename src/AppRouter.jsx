import { createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/homePage";
import TodoItemPage from "./pages/todoItemPage";
import Layout from "./pages/layoutPage";
import ErrorPage from "./pages/errorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "todo/:todoCategoryId",
        element: <TodoItemPage />,
      },
    ],
  },
]);
export default router;
