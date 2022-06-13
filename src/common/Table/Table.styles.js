import styled from '@emotion/styled';

export const Container = styled.div`
  display: block;
  width: 100%;
`;

export const TableWrapper = styled.table`
  border: 1px solid darkgray;
  border-radius: 18px;
  border-collapse: separate;
  /* width: 100%; */
  max-width: 660px;
`;

export const TH = styled.th`
  /* padding: 1rem; */
`;
export const TD = styled.td`
  padding: ${({ padding }) => padding || '1rem'};
  text-align: center;
  vertical-align: middle;
  border-bottom: ${({ borderBottom }) => borderBottom || 'none'};
`;
export const TR = styled.tr`
  border-bottom: ${({ borderBottom }) => borderBottom || 'none'};
`;
