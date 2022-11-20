import { HiUserCircle } from "react-icons/hi";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

const AvatarImage = styled.img`
  width: ${({ isSmall }) => (isSmall ? "30px" : "inherit")};
  height: ${({ isSmall }) => (isSmall ? "30px" : "inherit")};
  object-fit: cover;
  border-radius: 100%;
  overflow: hidden;
  max-width: 350px;
  max-height: 350px;
`;

const EmptyAvatarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function UserMiniAvatar({
  name,
  avatar,
  isSmall,
  emptySize = "2.5rem",
}) {
  useEffect(() => {
    setValid(true);
  }, [avatar]);
  const [isValid, setValid] = useState(true);
  return avatar && isValid ? (
    <AvatarImage
      src={avatar}
      alt={name || "user avatar"}
      isSmall={isSmall}
      onError={() => setValid(false)}
    />
  ) : (
    <EmptyAvatarWrapper>
      <HiUserCircle size={emptySize} />
    </EmptyAvatarWrapper>
  );
}
