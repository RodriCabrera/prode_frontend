import React from "react";
import { TD } from "./Table.styles";

interface Props {
  children: JSX.Element;
  borderBottom: string;
  fontSize: string;
  fontWeight: string;
  withBottomBorder: boolean;
  padding: string;
  margin: string;
  colSpan: number;
}

function Cell({ children, ...props }: Props) {
  const {
    borderBottom,
    colSpan,
    fontSize,
    fontWeight,
    withBottomBorder,
    padding,
    margin,
  } = props;
  return (
    <TD
      borderBottom={borderBottom}
      colSpan={colSpan}
      padding={padding}
      align="center"
      size={fontSize}
      weight={fontWeight}
      withBottomBorder={withBottomBorder}
      margin={margin}
    >
      {children}
    </TD>
  );
}

export { Cell };
