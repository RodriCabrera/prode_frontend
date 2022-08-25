import { useState } from 'react';

export const useSwitchGroupNumber = () => {
  const [groupNumber, setGroupNumber] = useState(0); // 0 - A, 1 - B, etc.

  const switchGroupNumber = (jumpValue) => {
    setGroupNumber((prevState) => prevState + jumpValue);
  };

  return { groupNumber, switchGroupNumber };
};
