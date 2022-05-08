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
  Form,
  PageContainer,
} from '../../common/common.styles';
import { Spinner } from '../../common/Spinner/Spinner';
import { changePassword } from '../../api/auth';
import { AuthContext } from '../../common/AuthProvider';
import { authSchema } from '../../validationSchemas/auth';

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
    <PageContainer id="change-password-page">
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
              {isLoading && <Spinner />}
              {error}
            </Form>
          </>
        </CardWrapper>
      </CardContainer>
    </PageContainer>
  );
}

export default ChangePassword;
