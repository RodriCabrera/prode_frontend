import React from "react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { render } from "@testing-library/react";
import { allProviders } from "../../App.test";

test("Render home page", () => {
  const { getByText } = render(<Home />, { wrapper: allProviders });
  expect(getByText("Leader Board")).toBeInTheDocument();
  expect(getByText("Next Matches")).toBeInTheDocument();
});
