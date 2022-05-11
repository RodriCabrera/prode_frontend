import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar/Navbar';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #212121;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  /* gap: 1rem; */
  /* width: 100vw; */
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
    <Layout>
      <Navbar />
      <PageContainer id="app-page-container">
        <PageWrapper id="app-page-wrapper">
          <Outlet />
        </PageWrapper>
      </PageContainer>
    </Layout>
  );
}

export default App;
