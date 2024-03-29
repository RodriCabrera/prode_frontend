import axios from "axios";

// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// }

export const getSoccerVideos = () => {
  // let page = getRandomArbitrary(1, 20);
  return axios.get(
    `https://api.pexels.com/videos/videos/6079615`,
    // eslint-disable-next-line no-undef
    { headers: { Authorization: process.env.REACT_APP_PEXELS_API_KEY } }
  );
};
