import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Text } from "../../../common/common.styles";
import { useIsMobile } from "../../../hooks/useIsMobile";
import {
  LandingPageWrapper,
  LeftPlaceholder,
  VideoBg,
} from "./LandingPage.styles";
import { getSoccerVideos } from "../../../api/pexels";
import Countdown from "../../Home/components/Countdown";

const LandingPageMain = () => {
  const [video, setVideo] = useState();
  const isMobile = useIsMobile();
  // example video link:
  // 'https://player.vimeo.com/external/597733080.sd.mp4?s=236ee37314b933a41625f6a24b1670d6742f81d0&profile_id=164&oauth2_token_id=57447761'

  useEffect(() => {
    getSoccerVideos().then((res) => {
      setVideo(res.data.videos[0].video_files[5].link);
    });
  }, []);

  // const [showForm, setShowForm] = useState(false)
  // const navigate = useNavigate()

  return (
    <LandingPageWrapper id="landing-page-wrapper">
      <LeftPlaceholder>
        <Text size={isMobile ? "3.5rem" : "5.5rem"} weight="800" color="tomato">
          Chumbazo.
        </Text>
        <Text size={isMobile ? "1.5rem" : "2.5rem"} weight="800">
          El prode para Qatar 2022.
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
