import React, { useState } from 'react';
import { createUser } from '../api/auth';
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
} from '../common/common.styles';
import GoogleAuth from '../common/GoogleAuth/GoogleAuth';

function Register() {
  const [registerData, setRegisterData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    // TODO: Que forma tiene que tener la data para registrarse?
    // POST a /auth/email/register con
    // obligatorio: email y password
    // optativo: nombre
    createUser(registerData)
      .then((res) => {
        // TODO: Que hacemo con esto...?
        // Si el servidor devuelve un 200 es que se envió un mail
        // de confirmación al usuario.
        console.log('Registro con exito', res);
      })
      .catch((err) => {
        setError(`Error : ${err.response.statusText} (${err.response.status})`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <PageWrapper id="register-page">
      <CardContainer id="register-card-container">
        <CardWrapper id="register-card-wrapper">
          <CardTitle>Register</CardTitle>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="name">
              Email:
              <Input
                type="email"
                placeholder="Email"
                name="name"
                value={registerData?.name}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="password">
              Password
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData?.password}
                onChange={handleChange}
              />
            </Label>
            <Text color={error && 'red'} text-align="center">
              {isLoading ? 'Cargando...' : error}
            </Text>
            <Button onClick={handleSubmit}>Register</Button>
          </Form>
          <GoogleAuth text="Register" />
        </CardWrapper>
        {/* Agregar un '<Button>Already registered? Login</Button>' ? */}
      </CardContainer>
    </PageWrapper>
  );
}

export default Register;
