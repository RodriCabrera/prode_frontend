import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 1rem;
  width: 100vw;
`;
export const CardTitle = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const CardWrapper = styled.div`
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  max-width: 500px;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
`;
