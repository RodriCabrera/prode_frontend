import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Text } from '../../../common/common.styles';
import { useIsMobile } from '../../../hooks/useIsMobile';
import {
  LandingPageWrapper,
  LeftPlaceholder,
  VideoBg,
} from './LandingPage.styles';
import { getSoccerVideos } from '../../../api/pexels';
import Countdown from '../../Home/components/Countdown';

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

  return (
    <LandingPageWrapper id="landing-page-wrapper">
      <LeftPlaceholder>
        <Text size={isMobile ? '4rem' : '6rem'} weight="800" color="tomato">
          Chumbazo.
        </Text>
        <Text size={isMobile ? '3rem' : '4rem'} weight="800">
          Armá un prode con quien quieras. Predecí. Ganá.
        </Text>
        <Countdown />
      </LeftPlaceholder>
      <div style={{ marginRight: '2rem' }}>
        <Outlet />
      </div>
      <VideoBg autoPlay loop muted src={video} type="video/mp4" poster="30" />
    </LandingPageWrapper>
  );
};

export default LandingPageMain;
