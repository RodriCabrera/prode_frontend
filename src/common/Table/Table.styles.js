import styled from '@emotion/styled';

export const Container = styled.div`
  display: block;
  width: 100%;
`;

export const TableWrapper = styled.table`
  border: ${({ fullWidth }) => (fullWidth ? 'none' : '1px solid darkgray')};
  border-radius: 18px;
  border-collapse: separate;
  margin: auto;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'initial')};
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '660px')};
  & td {
    padding-left: ${({ fullWidth }) => (fullWidth ? '0' : '')};
    padding-right: ${({ fullWidth }) => (fullWidth ? '0' : '')};
  }
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
