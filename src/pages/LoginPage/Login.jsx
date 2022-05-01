import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../common/AuthProvider';
import {
  CardWrapper,
  CardTitle,
  PageWrapper,
} from '../../common/common.styles';
import GoogleAuth from '../../common/GoogleAuth';

function Login() {
  const userContext = useContext(AuthContext);
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  useEffect(() => {
    if (userContext.user) {
      navigate('/');
    }
  }, [userContext]);

  return (
    <PageWrapper id="login-page">
      <CardWrapper id="login-card">
        <CardTitle>LOGIN</CardTitle>
        <form>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              placeholder="User Name"
              name="name"
              value={loginData?.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData?.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit" onClick={handleSubmit}>
            Btn
          </button>
        </form>
        <button type="button" onClick={() => navigate('/register')}>
          Register
        </button>
        <br />
        <GoogleAuth text="Login" />
      </CardWrapper>
    </PageWrapper>
  );
}

export default Login;
