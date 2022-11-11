import styled from "@emotion/styled";
import { HiOutlineUserGroup, HiCheck } from "react-icons/hi";
import { useTranslation } from "react-i18next";

import { ListElement } from "../../../common/Lists/ListElement";
import { useIsMobile } from "../../../hooks/useIsMobile";

import { ListWrapper } from "../../../common/Lists/Lists.styles";
import { Text } from "../../../common/common.styles";

const GroupsListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export function GroupSelector({
  selectedUserGroup,
  userGroupList,
  handleGroupSelect,
}) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  return (
    <>
      {userGroupList.length > 1 && (
        <>
          <Text size="1.4rem">{t("selectGroup")}</Text>
          <GroupsListWrapper>
            <ListWrapper>
              {userGroupList?.map((userGroup) => {
                const isSelected = selectedUserGroup?.id === userGroup.id;

                return (
                  <ListElement
                    key={userGroup.id}
                    avatar={
                      isSelected ? (
                        <HiCheck size="1.8rem" />
                      ) : (
                        <HiOutlineUserGroup size="1.8rem" />
                      )
                    }
                    bgColor={isSelected && "green"}
                    onClick={() => !isSelected && handleGroupSelect(userGroup)}
                    isMobile={isMobile}
                  >
                    <Text weight="600">{userGroup.name.toUpperCase()}</Text>
                  </ListElement>
                );
              })}
            </ListWrapper>
          </GroupsListWrapper>
        </>
      )}
    </>
  );
}
