import React, { useRef, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../../common/AuthProvider";
import { ListElement } from "../../../../../common/Lists/ListElement";
import { UserMiniAvatar } from "../../../../../common/UserMiniAvatar/UserMiniAvatar";

import {
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from "../../../../../common/common.styles";

const CloseButton = styled.button`
  align-self: flex-start;
  border: none;
  background: none;
  text-align: center;
  cursor: pointer;
  padding: 0 1rem 0 0;
  margin: 0;
`;

export default function UserList({ users, displayInfo, handleClose }) {
  const listRef = useRef();
  if (users.length === 0) handleClose();
  const navigate = useNavigate();
  const userContext = useContext(AuthContext);

  const handleProfileNavigate = (username) => {
    if (username === userContext.user.name) return navigate("/profile");
    return navigate(`/profile/${username}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listRef]);
  return (
    <CardContainer ref={listRef}>
      <CardWrapper>
        <CloseButton onClick={handleClose}>
          <MdOutlineChevronLeft size={24} />
        </CloseButton>
        <CardTitle>{displayInfo.stage}</CardTitle>
        <Text align="center" size="1.2rem">
          <span style={{ color: displayInfo.color }}>{displayInfo.name}</span>
        </Text>
        {users.map((user) => {
          return (
            <ListElement
              key={user._id}
              avatar={<UserMiniAvatar avatar={user.avatar} name={user.name} />}
              onClick={() => handleProfileNavigate(user.name)}
            >
              <Text>{user.name}</Text>
            </ListElement>
          );
        })}
      </CardWrapper>
    </CardContainer>
  );
}
