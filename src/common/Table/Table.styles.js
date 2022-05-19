import styled from '@emotion/styled';

export const Container = styled.div`
  display: block;
`;

export const TableWrapper = styled.table`
  border: 1px solid white;
  border-radius: 10%;
  border-collapse: separate;
  border-radius: 6px;
  padding: 1rem;
  width: 100%;
  max-width: 660px;
`;

export const TH = styled.th`
  /* padding: 1rem; */
`;
export const TD = styled.td`
  padding: 7px;
  text-align: center;
  vertical-align: middle;
  border-right: ${({ borderRight }) => borderRight || 'none'};
`;
