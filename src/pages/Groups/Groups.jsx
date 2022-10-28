import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { CardContainer, CardWrapper, Text } from "../../common/common.styles";
import CreateGroupForm from "./components/CreateGroupForm";
import JoinGroupForm from "./components/JoinGroupForm";
import GroupList from "./components/GroupList";
import { getUserGroups } from "../../api/groups";
import useCleanupController from "../../hooks/useCleanupController";
import { Spinner } from "../../common/Spinner/Spinner";
import styled from "@emotion/styled";
import { useIsMobile } from "../../hooks/useIsMobile";

const Row = styled.div`
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

function Groups() {
  const [groupList, setGroupList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();

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
          GRUPOS
        </Text>
        {!isEmpty(groupList) && (
          <Text size="1.5rem">Grupos en los que estás participando: </Text>
        )}
        {isLoading ? <Spinner /> : <GroupList groups={groupList} />}
      </CardWrapper>
      <Row>
        {/* <CardContainer> */}
        <CardWrapper border={isMobile ? "none" : ""}>
          <CreateGroupForm updateList={getGroupList} />
        </CardWrapper>
        {/* </CardContainer> */}

        {/* <CardContainer> */}
        <CardWrapper border={isMobile ? "none" : ""}>
          <JoinGroupForm updateList={getGroupList} />
        </CardWrapper>
        {/* </CardContainer> */}
      </Row>
    </CardContainer>
  );
}

export default Groups;
