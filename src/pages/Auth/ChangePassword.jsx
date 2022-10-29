import { isEmpty } from "lodash";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { Spinner } from "common/Spinner/Spinner";
import { changePassword } from "api/auth";
import { authSchema } from "validationSchemas/auth";

import {
  Button,
  CardContainer,
  CardTitle,
  CardWrapper,
  Input,
  Label,
  Form,
} from "common/common.styles";

function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.changePassword,
    validateOnMount: true,
  });
  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token") || token;
    setIsLoading(true);
    setError(undefined);
    changePassword(values, userToken)
      .then(() => {
        navigate("/");
      })
      .catch((err) => setError(err.response.data.error))
      .finally(() => setIsLoading(false));
  };

  return (
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
  );
}

export default ChangePassword;
