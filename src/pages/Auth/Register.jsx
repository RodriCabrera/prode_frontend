import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUser } from '../../api/auth';
import { AuthContext } from '../../common/AuthProvider';
import {
  Button,
  CardTitle,
  CardWrapper,
  Form,
  Input,
  Label,
  Text,
} from '../../common/common.styles';
import GoogleAuth from '../../common/GoogleAuth/GoogleAuth';
import { useIsMobile } from '../../hooks/useIsMobile';
import { authSchema } from '../../validationSchemas/auth';

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { values, errors, handleChange } = useFormik({
    initialValues: { name: null },
    validationSchema: authSchema.register,
    validateOnMount: true,
  });

  useEffect(() => {
    if (userContext.user) {
      navigate('/auth');
    }
  }, [userContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    toast.promise(
      createUser(values)
        .then(() => {
          return navigate('/auth/account-created');
        })
        .finally(() => setIsLoading(false)),
      {
        pending: 'Registrandote...',
        success: 'Registrado con éxito',
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };
  const isMobile = useIsMobile();
  return (
    <CardWrapper
      id="register-card-wrapper"
      isMobile={isMobile}
      border={isMobile ? 'null' : ''}
    >
      <CardTitle>Registrarse</CardTitle>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          {errors.name || 'Nombre de usuario:'}
          <Input
            type="text"
            placeholder="Username"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </Label>
        <Label htmlFor="email">
          <Text color={errors.email ? 'orange' : 'white'}>
            {errors.email || 'Email:'}
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
          <Text color={errors.password ? 'orange' : 'white'}>
            {errors.password || 'Password:'}
          </Text>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={values.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </Label>

        <Button onClick={handleSubmit} disabled={!isEmpty(errors) || isLoading}>
          CREAR CUENTA
        </Button>
      </Form>
      <GoogleAuth text="Register" />
      <Button grayscale padding="5px" onClick={() => navigate('/auth')}>
        Ya tenés cuenta?
      </Button>
    </CardWrapper>
  );
}

export default Register;
