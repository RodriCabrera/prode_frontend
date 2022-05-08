import { useEffect, useState } from 'react';

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

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return timeLeft.days > 0 ? (
    <>
      FALTAN:
      <p>DIAS: {timeLeft.days}</p>
      <p>HORAS: {timeLeft.hours}</p>
      <p>MINUTOS: {timeLeft.minutes}</p>
      <p>SEGUNDOS: {timeLeft.seconds}</p>
    </>
  ) : (
    ''
  );
}

export default Countdown;
