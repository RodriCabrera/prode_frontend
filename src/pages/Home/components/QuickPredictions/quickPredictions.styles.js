import styled from "@emotion/styled";
import { AvatarWrapper } from "../../../../common/Lists/Lists.styles";

export const SinglePredictionForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 1rem;
`;

export const PredictionMatch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  max-height: 2rem;
`;

export const GroupAvatar = styled(AvatarWrapper)`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  max-width: 2rem;
  background-color: darkorange;
  :hover {
    transform: scale(1.1);
  }
`;
