import styled from '@emotion/styled';

const PillWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
const Pill = styled.div`
  font-size: 12px;
  background-color: ${({ bg }) => bg};
  color: black;
  padding: 6px;
  border-radius: 6px;
`;
export function PredictionReferences() {
  return (
    <PillWrapper>
      <Pill bg="lightgreen">Acertaste resultado</Pill>
      <Pill bg="#FFFF66">Acertaste ganador</Pill>
      <Pill bg="tomato">No suma</Pill>
      <Pill bg="silver">No evaluado</Pill>
    </PillWrapper>
  );
}
