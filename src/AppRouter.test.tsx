import React from "react";
import { RouterProvider } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import appRouter from "./AppRouter";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
