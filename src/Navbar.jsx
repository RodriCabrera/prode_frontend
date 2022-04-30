import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import Loader from './Loader';

function Navbar() {
  const userContext = useContext(AuthContext);
  console.log(userContext.user?.user.name);
  if (userContext.isLoading) return <Loader />;

  return <div>Logged in: {userContext?.user.user.name}</div>;
}

export default Navbar;
