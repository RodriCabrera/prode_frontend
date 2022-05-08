import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/auth';
import { AuthContext } from '../../common/AuthProvider';
import {
  Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Form,
  Input,
  Label,
  PageContainer,
  Text,
} from '../../common/common.styles';
import GoogleAuth from '../../common/GoogleAuth/GoogleAuth';
import { Spinner } from '../../common/Spinner/Spinner';
import { authSchema } from '../../validationSchemas/auth';

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const userContext = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { values, errors, handleChange } = useFormik({
    initialValues: { name: null },
    validationSchema: authSchema.register,
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
    setError(undefined);

    createUser(values)
      .then((res) => {
        console.log('Registro con exito', res);
        return navigate('/account-created');
      })
      .catch((err) => {
        setError(`${err.response.statusText}${err.response.data.error}`);
        setShowError(true);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <PageContainer id="register-page">
      <CardContainer id="register-card-container">
        <CardWrapper id="register-card-wrapper">
          <CardTitle>Registrarse</CardTitle>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="name">
              Nombre:
              <Input
                type="text"
                placeholder="Username"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <Text color="orange">{errors.name}</Text>
            </Label>
            <Label htmlFor="email">
              Email:
              <Input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
                required
                value={values.password}
                onChange={handleChange}
              />
            </Label>
            <Text color="orange">{errors.password}</Text>

            <Text color={error && 'red'} text-align="center">
              {isLoading ? <Spinner /> : showError && error}
            </Text>
            <Button onClick={handleSubmit} disabled={!isEmpty(errors)}>
              CREAR CUENTA
            </Button>
          </Form>
          <GoogleAuth text="Register" />
          <Button grayscale padding="5px" onClick={() => navigate('/login')}>
            Ya tenés cuenta?
          </Button>
        </CardWrapper>
      </CardContainer>
    </PageContainer>
  );
}

export default Register;
