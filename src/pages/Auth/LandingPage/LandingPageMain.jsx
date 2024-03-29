import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getSoccerVideos } from "api/pexels";
import { useIsMobile } from "hooks/useIsMobile";
import Countdown from "../../Home/components/Countdown";

import { Text } from "common/common.styles";
import {
  LandingPageWrapper,
  LeftPlaceholder,
  VideoBg,
} from "./LandingPage.styles";

const LandingPageMain = () => {
  const [video, setVideo] = useState();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  useEffect(() => {
    getSoccerVideos().then((res) => {
      setVideo(res.data.video_files[5].link);
    });
  }, []);

  // const [showForm, setShowForm] = useState(false)
  // const navigate = useNavigate()

  return (
    <LandingPageWrapper id="landing-page-wrapper">
      <LeftPlaceholder isMobile={isMobile}>
        <Text size={isMobile ? "3.5rem" : "5.5rem"} weight="800" color="tomato">
          Chumbazo.
        </Text>
        <Text size={isMobile ? "1.5rem" : "2.5rem"} weight="800">
          {t("slogan")}
        </Text>
        <Countdown />
      </LeftPlaceholder>
      <Outlet />
      {/* TODO: La idea era primero mostrar 2 botones pero cuando me logueo se traba con los botones... */}
      {/* {showForm ? (
        <Outlet />
      ) : (
        <Column gap="2rem">
          <Button onClick={() => setShowForm(true)}>Ingresar</Button>
          <Button
            onClick={() => {
              setShowForm(true)
              navigate('register')
            }}
            tertiary
          >
            Registrarse
          </Button>
        </Column>
      )} */}
      <VideoBg autoPlay loop muted src={video} type="video/mp4" poster="30" />
    </LandingPageWrapper>
  );
};

export default LandingPageMain;
