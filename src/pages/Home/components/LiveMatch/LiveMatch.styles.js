import styled from "@emotion/styled";

export const MatchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const MatchInfoBanner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  margin-bottom: 1rem;
`;

export const MoreInfoTrigger = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const EventContainer = styled.div`
  width: 50%;
  margin-left: ${({ position }) => (position === "left" ? "0" : "50%")};
  display: flex;
  flex-direction: ${({ position }) =>
    position === "left" ? "row" : "row-reverse"};
  padding: 0.5rem 0.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.35rem;
`;

export const PlayerChangeGroup = styled.div`
  width: 100%;
  color: ${({ exit }) => (exit ? "salmon" : "lightgreen")};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: ${({ exit }) => (exit ? "flex-start" : "flex-end")};
`;
