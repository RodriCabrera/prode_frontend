import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar/Navbar';

const PageContainer = styled.div`
  background-color: #212121;
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100vw;
  min-height: calc(100vh - 100px);
  padding-top: 120px;
`;
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1100px;
  padding: 2rem;
  width: 100%;
`;

function App() {
  return (
    <>
      <Navbar />
      <PageContainer id="app-page-container">
        <PageWrapper id="app-page-wrapper">
          <Outlet />
        </PageWrapper>
      </PageContainer>
    </>
  );
}

export default App;
