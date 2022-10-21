import React from "react";

interface Props {
  children: JSX.Element;
}

const Body = ({ children }: Props) => {
  return <tbody>{children}</tbody>;
};

export { Body };
