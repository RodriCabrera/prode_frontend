import React from "react";
import { Text } from "../common.styles";
import { TH } from "./Table.styles";
interface Props {
  children: JSX.Element;
}
function Header({ children }: Props) {
  return (
    <TH>
      <Text weight="600">{children}</Text>
    </TH>
  );
}

export { Header };
