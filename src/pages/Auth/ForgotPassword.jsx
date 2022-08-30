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
  Form,
  Text,
} from '../../common/common.styles';
import { toast } from 'react-toastify';
import { Spinner } from '../../common/Spinner/Spinner';
import { forgotPassword } from '../../api/auth';
import { authSchema } from '../../validationSchemas/auth';

function ForgotPassword() {
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.forgotPassword,
    validateOnMount: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(
      forgotPassword(values),
      {
        pending: 'Buscando usuario',
        success: `Mail enviado a ${values.email}`,
        error: {
          render({ data }) {
            return data?.response.data?.error;
          },
        },
      }
    );
  };

  return (
    <CardContainer id="change-password-card-container">
      <CardWrapper id="change-password-card-wrapper">
        {/* {showSuccess ? (
          <>
            <h5>
              Email de recuperación de contraseña enviado a {values.email}
            </h5>
            <p>
              Allí encontrarás un link para que puedas crear una nueva
              contraseña
            </p>
          </> */}
        {/* ) : ( */}
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
              {/* <Text color={error && 'red'} align="center">
                {isLoading && <Spinner />}
                {error}
              </Text> */}
              <Button disabled={!isEmpty(errors)}>Recuperar contraseña</Button>
            </Form>
          </>
        {/* )} */}
      </CardWrapper>
    </CardContainer>
  );
}

export default ForgotPassword;
