import styled from "@emotion/styled";
import { Spinner } from "../Spinner/Spinner";

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #212121;
`;

function Loading() {
  return (
    <LoadingWrapper>
      <Spinner />
    </LoadingWrapper>
  );
}

export default Loading;
