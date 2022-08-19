import styled from '@emotion/styled';

export const LaterStages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  flex-wrap: nowrap;
  height: 50vh;
`;

export const StageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;
  gap: 1rem;
`;

export const Match = styled.div`
  text-align: center;
  & > h6 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const MatchData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-radius: 0.5rem;
  border: 1px solid #e6e6e6;
  padding: 0.65rem;
  gap: 5px;
  & > img {
    width: 2rem;
  }
`;
