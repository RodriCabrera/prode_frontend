import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { AuthContext } from '../common/AuthProvider';
import { Spinner } from '../common/Spinner/Spinner';
import { loginUser } from '../api/auth';
import { authSchema } from '../validationSchemas/auth';

function ChangePassword() {
  const userContext = useContext(AuthContext);
  const [animation, setAnimation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.forgotPassword,
    validateOnMount: true,
  });

  useEffect(() => {
    if (userContext.user) {
      navigate('/');
    }
    setAnimation('fade-in');
    return () => {
      console.log('Login component unmounted');
      // setAnimation('fade-out');
    };
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
    <PageWrapper id="change-password-page">
      <CardContainer id="change-password-card-container" className={animation}>
        <CardWrapper id="change-password-card-wrapper">
          <CardTitle>Cambiar Contraseña</CardTitle>
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
            <Text color={error && 'red'} text-align="center">
              {isLoading ? <Spinner /> : error}
            </Text>
            <Button type="submit" disabled={!isEmpty(errors)}>
              Recuperar contraseña
            </Button>
          </Form>
        </CardWrapper>
      </CardContainer>
    </PageWrapper>
  );
}

export default ChangePassword;
