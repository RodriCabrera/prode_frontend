import React from "react";
import { NavButton } from "./navigator.styles";

export default function NavLayer({ data, filterFunc, parseName }) {
  const handleClick = () => {
    return filterFunc(data);
  };
  return <NavButton onClick={handleClick}>{parseName(data)}</NavButton>;
}
