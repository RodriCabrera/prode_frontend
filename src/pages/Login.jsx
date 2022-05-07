import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { AuthContext } from '../common/AuthProvider';
import {
  Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Input,
  Label,
  PageWrapper,
  Form,
  Text,
} from '../common/common.styles';
import GoogleAuth from '../common/GoogleAuth/GoogleAuth';
import { Spinner } from '../common/Spinner/Spinner';
import { authSchema } from '../validationSchemas/auth';

// TODO - Sumar la opción 'Olvide mi contraseña',
// TODO   debería pedir nuevamente el mail y hacer un post a la API en /auth/new-password

function Login() {
  const userContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.login,
    validateOnMount: true,
  });
  console.log('errors', errors);
  useEffect(() => {
    if (userContext.user) {
      navigate('/');
    }
  }, [userContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    loginUser(values)
      .then((res) => {
        // TODO: Revisar si hay alguna solución más elegante que el reload
        if (res.status === 200) return window.location.reload();
        return navigate('/');
      })
      .catch((err) => setError(err.response.data.error))
      .finally(() => setIsLoading(false));
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
                value={values.email}
                onChange={handleChange}
              />
            </Label>
            <Text color="orange">{errors.email}</Text>
            <Label htmlFor="password">
              Password
              <Input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
              />
            </Label>
            <Text color="orange">{errors.password}</Text>
            <Text color={error && 'red'} text-align="center">
              {isLoading ? <Spinner /> : error}
            </Text>
            <Button type="submit" disabled={!isEmpty(errors)}>
              LOGIN
            </Button>
            <GoogleAuth text="Login" />
          </Form>
          <Button grayscale padding="8px" onClick={() => navigate('/register')}>
            Primera vez? Registrate
          </Button>
        </CardWrapper>
      </CardContainer>
    </PageWrapper>
  );
}

export default Login;
