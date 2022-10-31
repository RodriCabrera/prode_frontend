import { Link } from "react-router-dom";

import { Text } from "common/common.styles";

export function NoPredictionNotification() {
  return (
    <>
      <Text weight="500" size="2rem" align="center">
        Aún no hiciste ninguna predicción.
      </Text>
      <Text align="center" size="1.2rem">
        {" "}
        Hacelas desde <Link to="/predictions/">esta sección</Link>
      </Text>
    </>
  );
}
