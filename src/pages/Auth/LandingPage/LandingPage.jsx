import { ToastContainer } from "react-toastify";

import LandingPageMain from "./LandingPageMain";
import LandingPageInfo from "./LandingPageInfo";
import { useIsMobile } from "hooks/useIsMobile";

import "react-toastify/dist/ReactToastify.css";
import { LandingPageContainer } from "./LandingPage.styles";

const LandingPage = () => {
  const isMobile = useIsMobile();
  return (
    <LandingPageContainer id="landing-page-container">
      <LandingPageMain />
      <LandingPageInfo />
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
    </LandingPageContainer>
  );
};

export default LandingPage;
