import styled from "@emotion/styled";

export const FixtureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  min-height: 700px;
`;
export const GroupTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: ${({ fullWidth }) => (fullWidth ? 1 : "initial")};
  transition: all 1s ease-in-out;
`;

export const FixtureTablesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 4rem;
  align-items: center;
  justify-content: center;
`;

export const GroupButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const GroupButton = styled.button`
  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? "darkorange" : "transparent"};
  border: 1px solid white;
  border-radius: 12px;
  padding: 0.75rem;
  font-weight: 600;
  box-shadow: none;
  transition: transform ease-in 0.03s;
  &:hover {
    transform: translateY(-0.1rem) scale(1.05);
    box-shadow: 0 0.25rem 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: initial;
    box-shadow: 0 0.25rem 8px rgba(0, 0, 0, 0.2) inset;
  }
  &:disabled {
    transform: none;
    box-shadow: none;
    cursor: default;
    border: 1px solid gray;
    color: gray;
  }
`;
