import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../common/AuthProvider';
import {
  Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Form,
  Input,
  Label,
  PageWrapper,
} from '../../common/common.styles';
import GoogleAuth from '../../common/GoogleAuth/GoogleAuth';

function Login() {
  const userContext = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
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
          <Form>
            <Label htmlFor="email">
              Email:
              <Input
                type="text"
                placeholder="User Email"
                name="email"
                value={loginData?.email}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="password">
              Password
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData?.password}
                onChange={handleChange}
              />
            </Label>
            <Button type="submit" onClick={handleSubmit}>
              Login
            </Button>
            <GoogleAuth text="Login" />
          </Form>
          <Button onClick={() => navigate('/register')}>New? Register</Button>
        </CardWrapper>
      </CardContainer>
    </PageWrapper>
  );
}

export default Login;
