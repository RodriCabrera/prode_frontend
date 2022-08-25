import styled from '@emotion/styled';

export const Container = styled.div`
  display: block;
  width: 100%;
`;

export const TableWrapper = styled.table`
  border: ${({ fullWidth }) => (fullWidth ? 'none' : '1px solid dimgray')};
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
  vertical-align: middle;
  border-bottom: ${({ borderBottom }) => borderBottom || 'none'};
  text-align: ${({ align }) => align || 'center'};
  color: ${({ color }) => color || 'inherit'};
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  margin: ${({ margin }) => margin || '0'};
  transition: all ease 0.5s;
  &:after {
    ${({ withBottomBorder }) =>
      withBottomBorder &&
      `content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: white;
    `}
  }
`;
export const TR = styled.tr`
  border-bottom: ${({ borderBottom }) => borderBottom || 'none'};
`;
