import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Text } from "../../../common/common.styles";

const Container = styled.div`
  position: fixed;
  top: 2rem;
  right: 4rem;
  display: flex;
  gap: 1rem;
  background-color: darkslategray;
  padding: 0.75rem;
  border-radius: 20px;
  z-index: 10;
`;

const LandingPageSwitch = () => {
  const { i18n } = useTranslation();
  const isCurrentLang = (lang) => lang === i18n.language;

  return (
    <Container>
      <Text
        color={isCurrentLang("en") ? "orange" : "gray"}
        onClick={() => i18n.changeLanguage("en")}
      >
        ENG
      </Text>
      <Text color="gray">|</Text>
      <Text
        color={isCurrentLang("es") ? "orange" : "gray"}
        onClick={() => i18n.changeLanguage("es")}
      >
        ESP
      </Text>{" "}
    </Container>
  );
};

export default LandingPageSwitch;
