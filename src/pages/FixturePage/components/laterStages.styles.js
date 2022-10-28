import styled from "@emotion/styled";

export const LaterStages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 100%;
  flex-wrap: nowrap;
  height: 50vh;
  margin-bottom: 1rem;
`;

export const StageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-basis: ${({ isCenter }) => (isCenter ? "16%" : "14%")};
  gap: 1rem;
`;

export const Match = styled.div`
  text-align: center;
  & > h6 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const MatchPlaceHolder = styled.div`
  text-align: center;
  padding: 0.65rem;
  border-radius: 0.5rem;
  border: 1px solid dimgray;
  font-size: 1.2rem;
`;

export const MatchData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-radius: 0.5rem;
  border: 1px solid dimgray;
  padding: 0.65rem;
  gap: 5px;
  & > img {
    width: 2rem;
  }
`;

export const CollapsableStageButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  padding: 0.5rem;
  font-size: 1.8rem;
  text-transform: uppercase;
  cursor: pointer;
  &: after {
    width: 100%;
    border-bottom: 1px white;
  }
`;
