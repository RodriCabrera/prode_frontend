import React from "react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  fireEvent,
  render,
  screen,
  user,
} from "./vendors/react-testing-library";
import { FlagsmithProvider } from "flagsmith/react";
import config from "./Constants";
import flagsmith from "flagsmith";
import { AuthContext } from "./common/AuthProvider";

export const FakeAuthContextProvider = ({ children, logedIn = true }) => {
  return (
    <AuthContext.Provider
      value={{
        user: {
          _id: "1234567789",
          name: "Username",
          email: "fake@user.com",
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png",
        },
        isLoading: !logedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const allProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <FakeAuthContextProvider>
        <FlagsmithProvider
          options={{
            environmentID: config.FS_ENVIRONMENT_ID,
          }}
          flagsmith={flagsmith}
        >
          {children}
        </FlagsmithProvider>
      </FakeAuthContextProvider>
    </BrowserRouter>
  );
};

test("landing page rendering", async () => {
  const { getByText } = render(
    <FakeAuthContextProvider logedIn={false}>
      <App />
    </FakeAuthContextProvider>,
    { wrapper: BrowserRouter }
  );

  // verify page content for default route
  expect(getByText("Chumbazo")).toBeInTheDocument();
});

test("full app rendering", async () => {
  const { getByText } = render(<App />, {
    wrapper: allProviders,
  });

  // verify page content for default route
  expect(getByText("Username")).toBeInTheDocument();
  expect(getByText("Home")).toBeInTheDocument();
  expect(getByText("Fixture")).toBeInTheDocument();
  expect(getByText("Predictions")).toBeInTheDocument();
  expect(getByText("Scores")).toBeInTheDocument();
  expect(getByText("Groups")).toBeInTheDocument();
});
