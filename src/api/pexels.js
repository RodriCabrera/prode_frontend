import { pexelsAuth } from './instances';

export const getSoccerVideos = (signal) => {
  return pexelsAuth.get(
    'https://api.pexels.com/videos/search?query=nature&per_page=1',
    {
      signal,
    }
  );
};
