import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../common/AuthProvider';
import {
  CardContainer,
  CardTitle,
  CardWrapper,
  PageWrapper,
} from '../../common/common.styles';
import GoogleAuth from '../../common/GoogleAuth/GoogleAuth';

function Login() {
  const userContext = useContext(AuthContext);
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userContext.user) {
      navigate('/');
    }
  }, [userContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <PageWrapper id="login-page">
      <CardContainer id="login-card-container">
        <CardWrapper id="login-card-wrapper">
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
      </CardContainer>
    </PageWrapper>
  );
}

export default Login;
