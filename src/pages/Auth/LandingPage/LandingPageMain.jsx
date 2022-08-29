import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Text } from '../../../common/common.styles';
import { useIsMobile } from '../../../hooks/useIsMobile';
import {
  LandingPageWrapper,
  LeftPlaceholder,
  VideoBg,
} from './LandingPage.styles';

const LandingPageMain = () => {
  const [video, setVideo] = useState(null);
  const isMobile = useIsMobile();

  // useEffect(() => {
  //   getSoccerVideos()
  //     .then((res) => {
  //       setVideo(res.data.videos[0].video_files[5].link);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err, 'ERROR LOADING VIDEOS');
  //     });
  // }, []);
  // console.log(video);

  return (
    <LandingPageWrapper id="landing-page-wrapper">
      <LeftPlaceholder>
        <Text size={isMobile ? '4rem' : '6rem'} weight="800" color="tomato">
          Chumbazo.
        </Text>
        <Text size={isMobile ? '3rem' : '4rem'} weight="800">
          Armá un grupo con quien quieras. Predecí. Ganá.
        </Text>
      </LeftPlaceholder>
      <Outlet />
      <VideoBg autoPlay loop muted src={video} type="video/mp4" poster="30" />
    </LandingPageWrapper>
  );
};

export default LandingPageMain;
