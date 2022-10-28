import { LandingPageContainer } from "./LandingPage.styles";
import LandingPageMain from "./LandingPageMain";
import LandingPageInfo from "./LandingPageInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIsMobile } from "../../../hooks/useIsMobile";

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
