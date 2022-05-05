import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
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
  Text,
} from '../../common/common.styles';
import GoogleAuth from '../../common/GoogleAuth/GoogleAuth';

function Login() {
  const userContext = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
    setIsLoading(true);
    setError(undefined);
    loginUser(loginData)
      .then((res) => {
        // TODO: Revisar si hay alguna solución más elegante que el reload
        if (res.status === 200) return window.location.reload();
        return navigate('/');
      })
      .catch((err) => {
        if (err.response.status === 401)
          return setError(err.response.data.error);
        return setError('Error. Intenta de nuevo.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <PageWrapper id="login-page">
      <CardContainer id="login-card-container">
        <CardWrapper id="login-card-wrapper">
          <CardTitle>Login</CardTitle>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email">
              Email:
              <Input
                type="email"
                placeholder="User Email"
                name="email"
                required
                value={loginData?.email}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="password">
              Password
              <Input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={loginData?.password}
                onChange={handleChange}
              />
            </Label>
            <Text color={error && 'red'} text-align="center">
              {isLoading ? 'Cargando...' : error}
            </Text>
            <Button type="submit" onClick={handleSubmit}>
              Login
            </Button>
            <GoogleAuth text="Login" />
          </Form>
          <Button grayscale padding="5px" onClick={() => navigate('/register')}>
            New? Register
          </Button>
        </CardWrapper>
      </CardContainer>
    </PageWrapper>
  );
}

export default Login;
