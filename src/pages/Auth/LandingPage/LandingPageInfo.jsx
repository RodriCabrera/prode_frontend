import { useIsMobile } from "hooks/useIsMobile";

import { CardWrapper, Text } from "common/common.styles";
import { LPInfoContainer, LPInfoWrapper } from "./LandingPage.styles";

const LandingPageInfo = () => {
  const isMobile = useIsMobile();
  return (
    <LPInfoContainer id="lp-info-container">
      <Text
        size={isMobile ? "3rem" : "4rem"}
        weight="800"
        align="center"
        margin="2rem"
      >
        Unite, predecí y ganá
      </Text>
      <LPInfoWrapper>
        <CardWrapper isMobile={isMobile}>
          <Text
            size={isMobile ? "1rem" : "1.5rem"}
            weight="600"
            color="tomato"
            align="center"
          >
            ⚽️ Creá un grupo y enviá invitaciones a quien quieras
          </Text>
          <Text size={isMobile ? ".8rem" : "1.2rem"} weight="400">
            Podés personalizar el sistema de puntajes y la fecha tope para hacer
            las predicciones
          </Text>
          <Text
            size={isMobile ? "1rem" : "1.5rem"}
            weight="600"
            color="tomato"
          ></Text>
        </CardWrapper>
        <CardWrapper isMobile={isMobile}>
          <Text
            size={isMobile ? "1rem" : "1.5rem"}
            weight="600"
            color="tomato"
            align="center"
          >
            ⚽️ Unite a un grupo existente con 1 solo click.
          </Text>
          <Text size={isMobile ? ".8rem" : "1.2rem"} weight="400">
            Vas a recibir la invitación por WhatsApp, mail o Telegram.
          </Text>
        </CardWrapper>
        <CardWrapper isMobile={isMobile}>
          <Text
            size={isMobile ? "1rem" : "1.5rem"}
            weight="600"
            color="tomato"
            align="center"
          >
            ⚽️ Consultá el fixture interno
          </Text>
          <Text size={isMobile ? ".8rem" : "1.2rem"} weight="400">
            El fixture interno se mantiene actualizado con los datos de la FIFA.
          </Text>
        </CardWrapper>
      </LPInfoWrapper>
    </LPInfoContainer>
  );
};

export default LandingPageInfo;
