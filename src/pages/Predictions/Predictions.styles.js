import styled from '@emotion/styled';
import { Button } from '../../common/common.styles';

export const MiProdeContainer = styled.div`
  gap: 1rem;
  padding: 1rem;
`;
// export const Banner = styled.div`
//   cursor: pointer;
//   background-color: #f47d34;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
//   padding: 2rem;
//   border-radius: 7px;
//   transition: all 0.3s ease;
//   :hover {
//     background-color: #ad691f;
//   }
// `;
export const Banner = styled(Button)`
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BannerTitle = styled.h3`
  font-weight: 500;
  font-size: 2.5rem;
`;
