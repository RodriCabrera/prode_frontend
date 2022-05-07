import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
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
import { Spinner } from '../common/Spinner/Spinner';
import { forgotPassword } from '../api/auth';
import { authSchema } from '../validationSchemas/auth';

function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.forgotPassword,
    validateOnMount: true,
  });

  console.log(values.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    forgotPassword('pepe@gmail.com')
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => navigate('/new-password'), 3000);
      })
      .catch((err) => setError(err.response.data.error))
      .finally(() => setIsLoading(false));
  };

  return (
    <PageWrapper id="change-password-page">
      <CardContainer id="change-password-card-container">
        <CardWrapper id="change-password-card-wrapper">
          {showSuccess ? (
            <p>Email enviado</p>
          ) : (
            <>
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
                <Button disabled={!isEmpty(errors)}>
                  Recuperar contraseña
                </Button>
              </Form>
            </>
          )}
        </CardWrapper>
      </CardContainer>
    </PageWrapper>
  );
}

export default ChangePassword;
