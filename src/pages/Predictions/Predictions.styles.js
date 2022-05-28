import styled from '@emotion/styled';
import { Button, Text } from '../../common/common.styles';

export const PredictionsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 1rem;
  padding: 1rem;
`;

export const OptionsWrapper = styled.div`
  gap: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;
export const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const Banner = styled(Button)`
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BannerLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const BannerTitle = styled(Text)`
  font-weight: 500;
  font-size: 2.5rem;
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: dimgray; */
  padding: 1rem 0;
  border-radius: 1rem;
`;
export const ToggleWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`;
