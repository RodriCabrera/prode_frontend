import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [registerData, setRegisterData] = useState({
    name: null,
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    // TODO: Revisar que al llenar el campo nombre salta un warning que dice
    // que no hay que llenarlo de la nada (que ya tiene que existir). El problema
    // es que si el usuario no da nombre no hay que pasarlo o pasarlo como null
    // R: inicializar 'name' como null sirve? Si no se modifica quedaria como null.
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    createUser(registerData)
      .then((res) => {
        if (res.status === 200) return navigate('/account-created');
        console.log('Registro con exito', res);
        return navigate('/');
      })
      .catch((err) => {
        setError(`Error : ${err.response.data.error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <PageWrapper id="register-page">
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
                value={registerData?.name}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="email">
              Email:
              <Input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={registerData?.email}
                onChange={handleChange}
              />
            </Label>
            <Label htmlFor="password">
              Password
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={registerData?.password}
                onChange={handleChange}
              />
            </Label>
            <Text color={error && 'red'} text-align="center">
              {isLoading ? 'Cargando...' : error}
            </Text>
            <Button onClick={handleSubmit}>Registrarse</Button>
          </Form>
          <GoogleAuth text="Register" />
        </CardWrapper>
        {/* Agregar un '<Button>Already registered? Login</Button>' ? */}
      </CardContainer>
    </PageWrapper>
  );
}

export default Register;
