import { GiSoccerBall } from "react-icons/gi";

import "./ball-loader.css";

export const BallLoader = () => {
  return (
    <div className="loader-container">
      <div className="ball">
        <GiSoccerBall color="tomato" size={"3em"} />
      </div>
    </div>
  );
};
