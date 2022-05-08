import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import {
  Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Input,
  Label,
  PageContainer,
  Form,
  Text,
} from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';
import { forgotPassword } from '../../api/auth';
import { authSchema } from '../../validationSchemas/auth';

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.forgotPassword,
    validateOnMount: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    forgotPassword(values)
      .then(() => {
        setShowSuccess(true);
      })
      .catch((err) => setError(err.response.data.error))
      .finally(() => setIsLoading(false));
  };

  return (
    <PageContainer id="change-password-page">
      <CardContainer id="change-password-card-container">
        <CardWrapper id="change-password-card-wrapper">
          {showSuccess ? (
            <>
              <h5>
                Email de recuperación de contraseña enviado a {values.email}
              </h5>
              <p>
                Allí encontrarás un link para que puedas crear una nueva
                contraseña
              </p>
            </>
          ) : (
            <>
              <CardTitle>Recuperar Contraseña</CardTitle>
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
                {/* <Text color="orange">{errors.email}</Text> */}
                <Text color={error && 'red'} text-align="center">
                  {isLoading && <Spinner />}
                  {error}
                </Text>
                <Button disabled={!isEmpty(errors)}>
                  Recuperar contraseña
                </Button>
              </Form>
            </>
          )}
        </CardWrapper>
      </CardContainer>
    </PageContainer>
  );
}

export default ForgotPassword;
