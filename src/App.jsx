import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './common/Navbar/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { useIsMobile } from './hooks/useIsMobile';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #212121;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
  padding-top: 2rem;
`;

function App() {
  const isMobile = useIsMobile();
  return (
    <Layout>
      <Navbar />
      <PageContainer id="app-page-container">
        <PageWrapper id="app-page-wrapper">
          <Outlet />
          <ToastContainer
            position={isMobile ? 'top-right' : 'bottom-right'}
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            theme="dark"
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </PageWrapper>
      </PageContainer>
    </Layout>
  );
}

export default App;
