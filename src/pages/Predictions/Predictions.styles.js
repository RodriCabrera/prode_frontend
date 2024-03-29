import styled from "@emotion/styled";
import { Button, Text } from "../../common/common.styles";

export const PredictionsPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export const BannerButton = styled(Button)`
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const BannerDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const BannerTitle = styled(Text)`
  font-weight: 500;
  font-size: 1.8rem;
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
