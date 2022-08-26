import { GiSoccerBall } from 'react-icons/gi';
import './ball-loader.css';
export const BallLoader = () => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className="ball">
        <GiSoccerBall color="tomato" size={'3em'} />
      </div>
    </div>
  );
};
