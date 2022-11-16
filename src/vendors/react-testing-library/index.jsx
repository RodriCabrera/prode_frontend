import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { FlagsmithProvider } from "flagsmith/react";
import flagsmith from "flagsmith";
import config from "../../Constants";
import AuthProvider from "../../common/AuthProvider";
import "@testing-library/jest-dom";
import "@testing-library/user-event";

const AllTheProviders = ({ children }) => {
  return (
    <FlagsmithProvider
      options={{
        environmentID: config.FS_ENVIRONMENT_ID,
      }}
      flagsmith={flagsmith}
    >
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
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
