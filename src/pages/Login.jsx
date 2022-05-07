import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
              <Text color={errors.email ? 'orange' : ''}>
                {errors.email ? errors.email : 'Email:'}
              </Text>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={values.email}
                onChange={handleChange}
              />
            </Label>

            <Label htmlFor="password">
              <Text color={errors.password ? 'orange' : ''}>
                {errors.password ? errors.password : 'Password:'}
              </Text>
              <Input
                type="password"
                name="password"
                required
                placeholder="Al menos 6 caracteres"
                value={values.password}
                onChange={handleChange}
              />
            </Label>
            <Text color={error && 'red'} text-align="center">
              {isLoading ? <Spinner /> : error}
            </Text>
            <Button type="submit" disabled={!isEmpty(errors)}>
              LOGIN
            </Button>
            <GoogleAuth text="Login" />
            <Link to="/change-password">Olvidé mi contraseña</Link>
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
