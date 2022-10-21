import { TR } from "./Table.styles";
interface IRowProps {
  borderBottom: string;
  children: JSX.Element;
}
function Row({ children, ...props }: IRowProps) {
  const { borderBottom } = props;

  return <TR borderBottom={borderBottom}>{children}</TR>;
}

export { Row };
