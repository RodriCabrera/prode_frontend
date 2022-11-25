import React from "react";
import "@testing-library/jest-dom";
import Home from "./Home";
// import { render } from "./vendors/react-testing-library";
import { getByText, render, screen } from "@testing-library/react";
import { allProviders } from "../../App.test";
import { AuthContext } from "../../common/AuthProvider";

test("Render home page", () => {
  const { getByText } = render(<Home />, { wrapper: allProviders });
  expect(getByText("Leader Board")).toBeInTheDocument();
  expect(getByText("Next Matches")).toBeInTheDocument();
});
