import React from "react";
interface Props {
  children: JSX.Element;
}
function Head({ children }: Props) {
  return <thead>{children}</thead>;
}

export { Head };
