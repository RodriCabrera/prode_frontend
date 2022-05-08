import { Outlet } from 'react-router-dom';
import { PageContainer, PageWrapper } from './common/common.styles';
import Navbar from './common/Navbar/Navbar';

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
