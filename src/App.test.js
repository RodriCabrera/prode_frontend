// app.test.js
// import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { render } from "./vendors/react-testing-library";

test("full app rendering/navigating", async () => {
  const { getByText } = render(<App />, { wrapper: BrowserRouter });

  // verify page content for default route
  expect(getByText("Chumbazo")).toBeInTheDocument();

  // verify page content for expected route after navigating
  //   await user.click(screen.getByText(/about/i));
  //   expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});
