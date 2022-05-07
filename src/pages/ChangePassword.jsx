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
import { Spinner } from '../common/Spinner/Spinner';
import { changePassword } from '../api/auth';
import { authSchema } from '../validationSchemas/auth';
import { AuthContext } from '../common/AuthProvider';

function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const userContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.changePassword,
    validateOnMount: true,
  });

  useEffect(() => {
    if (!userContext.user) {
      navigate('/login');
    }
  }, [userContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    changePassword(values)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => setError(err.response.data.error))
      .finally(() => setIsLoading(false));
  };

  return (
    <PageWrapper id="change-password-page">
      <CardContainer id="change-password-card-container">
        <CardWrapper id="change-password-card-wrapper">
          <>
            <CardTitle>Cambiar Contraseña</CardTitle>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="password">
                Nueva contraseña: {error}
                <Input
                  type="password"
                  placeholder="Nueva contraseña"
                  name="password"
                  required
                  value={values.email}
                  onChange={handleChange}
                />
              </Label>
              <Button disabled={!isEmpty(errors)}>Cambiar contraseña</Button>
            </Form>
          </>
        </CardWrapper>
      </CardContainer>
    </PageWrapper>
  );
}

export default ChangePassword;
