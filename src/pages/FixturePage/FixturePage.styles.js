import styled from '@emotion/styled';

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
  flex-grow: ${({ fullWidth }) => (fullWidth ? 1 : 'initial')};
`;

export const FixtureTablesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 4rem;
  align-items: center;
  justify-content: center;
`;
