import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../common/AuthProvider';
import { PageWrapper } from '../common/common.styles';

function Home() {
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(userContext);
  useEffect(() => {
    if (!userContext.user) {
      navigate('/login');
    }
  }, [userContext]);

  return (
    <PageWrapper>
      <h1>Home</h1>
    </PageWrapper>
  );
}

export default Home;
