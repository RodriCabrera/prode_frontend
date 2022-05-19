import { TR } from './Table.styles';

function Row({ children, ...props }) {
  const { borderBottom } = props;

  return <TR borderBottom={borderBottom}>{children}</TR>;
}

export { Row };
