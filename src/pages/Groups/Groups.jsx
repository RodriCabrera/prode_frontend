import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";

import CreateGroupForm from "./components/CreateGroupForm";
import JoinGroupForm from "./components/JoinGroupForm";
import GroupList from "./components/GroupList";
import { getUserGroups } from "../../api/groups";
import useCleanupController from "../../hooks/useCleanupController";
import { Spinner } from "../../common/Spinner/Spinner";
import { useIsMobile } from "../../hooks/useIsMobile";

import { CardContainer, CardWrapper, Text } from "../../common/common.styles";

const Row = styled.div`
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 2rem;
`;

function Groups() {
  const [groupList, setGroupList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const getGroupList = () => {
    setIsLoading(true);
    getUserGroups(signal)
      .then(({ data }) => {
        setGroupList(data);
      })
      .catch((error) => {
        handleCancel(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getGroupList();
    return cleanup;
  }, []);

  return (
    <CardContainer>
      <CardWrapper border="none" isMobile={true}>
        <Text size="2.5rem" weight="500" align="center">
          {t("groups").toUpperCase()}
        </Text>
        {!isEmpty(groupList) && <Text size="1.5rem">{t("yourGroups")} </Text>}
        {isLoading ? <Spinner /> : <GroupList groups={groupList} />}
      </CardWrapper>
      <Row>
        <CardWrapper border={isMobile ? "none" : ""}>
          <CreateGroupForm updateList={getGroupList} />
        </CardWrapper>
        <CardWrapper border={isMobile ? "none" : ""}>
          <JoinGroupForm updateList={getGroupList} />
        </CardWrapper>
      </Row>
    </CardContainer>
  );
}

export default Groups;
