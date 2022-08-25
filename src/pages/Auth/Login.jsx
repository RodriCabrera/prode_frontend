import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../api/auth';
import { AuthContext } from '../../common/AuthProvider';
import {
  Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Input,
  Label,
  Form,
  Text,
} from '../../common/common.styles';
import GoogleAuth from '../../common/GoogleAuth/GoogleAuth';
import { authSchema } from '../../validationSchemas/auth';

function Login() {
  const userContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.login,
    validateOnMount: true,
  });

  useEffect(() => {
    if (userContext.user) {
      navigate('/');
    }
  }, [userContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    toast.promise(
      loginUser(values)
        .then(() => {
          window.location.reload();
          return navigate('/');
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: 'Logueandote...',
        success: 'Logueado con éxito',
        error: {
          render({ data }) {
            return data?.response.data?.error || 'Error al autenticar...';
          },
        },
      }
    );
  };

  return (
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
          <Button type="submit" disabled={!isEmpty(errors) || isLoading}>
            LOGIN
          </Button>
          <GoogleAuth text="Login" />
          <Link to="forgot-password">Olvidé mi contraseña</Link>
        </Form>
        <Button grayscale padding="8px" onClick={() => navigate('register')}>
          Primera vez? Registrate
        </Button>
      </CardWrapper>
    </CardContainer>
  );
}

export default Login;
