import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./common/Navbar/Navbar";
import Footer from "./common/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useIsMobile } from "./hooks/useIsMobile";
import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";
import config from "./Constants";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #111;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  /* margin-bottom: 3rem; */
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
  padding-top: 2rem;
  min-height: calc(100vh - 148px - 50px);
`;

function App() {
  const isMobile = useIsMobile();

  return (
    <FlagsmithProvider
      options={{
        environmentID: config.FS_ENVIRONMENT_ID,
      }}
      flagsmith={flagsmith}
    >
      <Layout>
        <Navbar />
        <PageContainer id="app-page-container">
          <PageWrapper id="app-page-wrapper">
            <Outlet />
            <ToastContainer
              position={isMobile ? "top-right" : "bottom-right"}
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop={false}
              theme="dark"
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </PageWrapper>
        </PageContainer>
        {!isMobile && <Footer />}
      </Layout>
    </FlagsmithProvider>
  );
}

export default App;
