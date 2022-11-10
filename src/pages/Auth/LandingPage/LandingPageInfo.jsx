import { useIsMobile } from "hooks/useIsMobile";
import { useTranslation } from "react-i18next";

import { CardWrapper, Text } from "common/common.styles";
import { LPInfoContainer, LPInfoWrapper } from "./LandingPage.styles";

const LandingPageInfo = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  return (
    <LPInfoContainer id="lp-info-container">
      <Text
        size={isMobile ? "3rem" : "4rem"}
        weight="800"
        align="center"
        margin="2rem"
      >
        {t("landing.main")}
      </Text>
      <LPInfoWrapper>
        <CardWrapper isMobile={isMobile}>
          <Text
            size={isMobile ? "1rem" : "1.5rem"}
            weight="600"
            color="tomato"
            align="center"
          >
            ⚽️ {t("landing.first.title")}
          </Text>
          <Text size={isMobile ? ".8rem" : "1.2rem"} weight="400">
            {t("landing.first.subtitle")}
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
            ⚽️ {t("landing.second.title")}
          </Text>
          <Text size={isMobile ? ".8rem" : "1.2rem"} weight="400">
            {t("landing.second.subtitle")}
          </Text>
        </CardWrapper>
        <CardWrapper isMobile={isMobile}>
          <Text
            size={isMobile ? "1rem" : "1.5rem"}
            weight="600"
            color="tomato"
            align="center"
          >
            ⚽️ {t("landing.third.title")}
          </Text>
          <Text size={isMobile ? ".8rem" : "1.2rem"} weight="400">
            {t("landing.third.subtitle")}
          </Text>
        </CardWrapper>
      </LPInfoWrapper>
    </LPInfoContainer>
  );
};

export default LandingPageInfo;
