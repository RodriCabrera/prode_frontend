import styled from "@emotion/styled";
import { useEffect, useState } from "react";

// LOGICA DEL COUNTDOWN:
const calculateTimeLeft = () => {
  const year = new Date().getFullYear();
  const difference = +new Date(`${year}-11-21T13:00`) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  max-width: 400px;
  flex-wrap: wrap;
  margin-top: 1rem;
`;
const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid tomato;
  border-radius: 100%;
  width: 80px;
  height: 80px;
`;

const Count = styled.h5`
  font-weight: 700;
  font-size: 1.7rem;
  user-select: none;
`;
const Detail = styled.h5`
  user-select: none;
`;

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return timeLeft.days > 0 ? (
    <Wrapper>
      <Block>
        <Count>{timeLeft.days}</Count>
        <Detail>D </Detail>
      </Block>
      <Block>
        <Count>{timeLeft.hours}</Count>
        <Detail>H</Detail>
      </Block>
      <Block>
        <Count>{timeLeft.minutes}</Count>
        <Detail>M</Detail>
      </Block>
      <Block>
        <Count>{timeLeft.seconds}</Count>
        <Detail>S</Detail>
      </Block>
    </Wrapper>
  ) : (
    ""
  );
}

export default Countdown;
