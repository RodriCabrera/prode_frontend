import styled from "@emotion/styled";
import React from "react";

const FooterWrapper = styled.div`
  width: 100%;
  background-color: #000;
  height: 80px;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  color: #888;
`;
const NameLink = styled.a`
  color: #888;
`;
const Footer = () => {
  return (
    <FooterWrapper>
      Creado por
      <NameLink
        href="https://www.linkedin.com/in/santiago-javier-rubio/"
        target={"_blank"}
      >
        Santiago Rubio
      </NameLink>
      &{" "}
      <NameLink href="https://www.linkedin.com/in/rodrigo-cabrera/">
        Rodrigo Cabrera
      </NameLink>
    </FooterWrapper>
  );
};

export default Footer;
