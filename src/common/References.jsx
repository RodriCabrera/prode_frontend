import styled from "@emotion/styled";

const ReferencesPillWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;
const Pill = styled.div`
  font-size: ${({ size }) => size || "12px"};
  background-color: ${({ bg }) => bg};
  color: black;
  padding: 6px;
  border-radius: 6px;
`;
export function References({ green, yellow, red, gray, size }) {
  return (
    <ReferencesPillWrapper>
      {green && (
        <Pill size={size} bg="lightgreen">
          {green}
        </Pill>
      )}
      {yellow && (
        <Pill size={size} bg="#FFFF66">
          {yellow}
        </Pill>
      )}
      {red && (
        <Pill size={size} bg="tomato">
          {red}
        </Pill>
      )}
      {gray && (
        <Pill size={size} bg="silver">
          {gray}
        </Pill>
      )}
    </ReferencesPillWrapper>
  );
}
