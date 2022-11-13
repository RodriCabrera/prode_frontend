import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import useCleanupController from "../../../../hooks/useCleanupController";
import { getGroupData } from "../../../../api/groups";
import { getExtraPredictions } from "../../../../api/predictions";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import { parseDate } from "../../../pagesHelpers";

import { AuthContext } from "../../../../common/AuthProvider";
import { UserMiniAvatar } from "../../../../common/UserMiniAvatar/UserMiniAvatar";
import { ListElement } from "../../../../common/Lists/ListElement";
import { BallLoader } from "../../../../common/Spinner/BallLoader";
import { Collapsable } from "../../../../common/Collapsable/Collapsable";
import Table from "../../../../common/Table/Table";
import {
  CardContainer,
  CardWrapper,
  Text,
} from "../../../../common/common.styles";

const NotAvailableBox = styled.div`
  width: 100%;
  height: 6rem;
  margin-top: -1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(100, 100, 100, 0.1);
  border-radius: 0 0 6px 6px;
`;

export default function ExtraPredictionsResults() {
  const { name } = useParams();
  const userContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState({});
  const [userPredictions, setUserPredictions] = useState({});
  const isMobile = useIsMobile();
  const [signal, cleanup] = useCleanupController();
  const navigate = useNavigate();

  useEffect(() => {
    getGroupData(name, signal).then((res) => {
      if (res.data?.groupData) setGroupData(res.data.groupData);
    });
    return cleanup;
  }, [name]);

  useEffect(() => {
    if (groupData.id && groupData.extraPredictions?.length > 0)
      getExtraPredictions(groupData.id, false, signal)
        .then(
          (res) => res.data && setUserPredictions(res.data.extraPredictions)
        )
        .finally(() => setLoading(false));
  }, [groupData.id]);

  const handleUserClick = (user) => {
    if (user === userContext.user.name) return navigate("/profile/");
    return navigate(`/profile/${user}`);
  };

  const hasPredictions = (fieldName) => {
    if (!fieldName) return false;
    return Object.entries(userPredictions).some(
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      ([_, user]) => user.predictions[fieldName]
    );
  };

  return (
    <CardContainer>
      <CardWrapper border="none" padding="0rem" isMobile={true}>
        {loading ? (
          <BallLoader />
        ) : (
          <>
            {groupData.extraPredictions.map((field) => (
              <Collapsable key={field.key} name={field.key}>
                {Date.parse(field.timeLimit) > Date.now() ? (
                  <NotAvailableBox>
                    <Text color="salmon">
                      Available on {parseDate(field.timeLimit)}
                    </Text>
                  </NotAvailableBox>
                ) : !hasPredictions(field.key) ? (
                  <NotAvailableBox>
                    <Text color="salmon">No predictions</Text>
                  </NotAvailableBox>
                ) : (
                  <Table fullWidth padding={!isMobile && "0rem 1rem"}>
                    <Table.Body>
                      {groupData.members.map((user) => {
                        if (
                          userPredictions[user.name]?.predictions[field.key]
                        ) {
                          return (
                            <Table.Row key={user.name}>
                              <Table.Cell>
                                <ListElement
                                  isMobile={true}
                                  avatar={
                                    <UserMiniAvatar
                                      avatar={user.avatar}
                                      name={user.name}
                                    />
                                  }
                                  onClick={() => handleUserClick(user.name)}
                                >
                                  <Text margin="1rem">{user.name}</Text>
                                </ListElement>
                              </Table.Cell>
                              <Table.Cell>
                                <Text>
                                  {
                                    userPredictions[user.name]?.predictions[
                                      field.key
                                    ]
                                  }
                                </Text>
                              </Table.Cell>
                            </Table.Row>
                          );
                        }
                      })}
                    </Table.Body>
                  </Table>
                )}
              </Collapsable>
            ))}
          </>
        )}
      </CardWrapper>
    </CardContainer>
  );
}
