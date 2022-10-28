import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../common/AuthProvider";
import { useIsMobile } from "../../hooks/useIsMobile";
import LeaderBoard from "./components//LeaderBoard/LeaderBoard";
import NotificationBoard from "./components/NotificationBoard/NotificationBoard";
import QuickPrediction from "./components/QuickPredictions/QuickPrediction";
import ShortFixture from "./components/ShortFixture";

import { Button } from "../../common/common.styles";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
`;
const Column = styled.div`
  gap: 2rem;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Row = styled.div`
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

function Home() {
  const isMobile = useIsMobile();
  const [shownSections, setShownSection] = useState(
    isMobile ? [] : ["fixture", "leaders", "quick"]
  );
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let subscribed = true;

    if (!userContext.user && subscribed) {
      navigate("/auth");
    }
    return () => (subscribed = false);
  }, [userContext]);

  const renderButton = (section) => {
    const buttonText = () => {
      if (section === "fixture") return "Próximos partidos";
      if (section === "leaders") return "Ranking de usuarios";
      if (section === "quick") return "Predicción al paso";
    };
    const handleClick = () => {
      if (shownSections.includes(section)) {
        setShownSection([]);
      } else setShownSection([section]);
    };
    return (
      <Button
        tertiary={isMobile && shownSections.includes(section)}
        width="334px"
        onClick={handleClick}
      >
        {buttonText()}
      </Button>
    );
  };

  return (
    <PageWrapper>
      <NotificationBoard id="notification-board" />
      <Row>
        <Column>
          {isMobile && renderButton("fixture")}
          {shownSections.includes("fixture") && <ShortFixture />}
        </Column>
        <Column>
          {isMobile && renderButton("leaders")}
          {shownSections.includes("leaders") && <LeaderBoard />}
        </Column>
        <Column>
          {isMobile && renderButton("quick")}
          {shownSections.includes("quick") && <QuickPrediction />}
        </Column>
      </Row>
    </PageWrapper>
  );
}

export default Home;
