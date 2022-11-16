import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { FlagsmithProvider } from "flagsmith/react";
import flagsmith from "flagsmith";
import config from "../../Constants";
import { AuthContext } from "../../common/AuthProvider";
import "@testing-library/jest-dom";
import "@testing-library/user-event";
const mockUser = {
  isLoading: false,
  user: {
    avatar:
      "http://res.cloudinary.com/dg5m04nxn/image/upload/c_thumb,h_200,w_200,r_max/avatars/messi4.png",
    email: "testuser@gmail.com",
    name: "TestUser",
    _id: "634a1b02ed14d80f4bdee2a8",
  },
};
const AllTheProviders = ({ children }) => {
  return (
    <FlagsmithProvider
      options={{
        environmentID: config.FS_ENVIRONMENT_ID,
      }}
      flagsmith={flagsmith}
    >
      <BrowserRouter>
        <AuthContext.Provider value={mockUser}>{children}</AuthContext.Provider>
      </BrowserRouter>
    </FlagsmithProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
