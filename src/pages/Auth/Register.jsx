import { useContext, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthContext } from "common/AuthProvider";
import { authSchema } from "validationSchemas/auth";
import { createUser } from "api/auth";
import { useIsMobile } from "hooks/useIsMobile";
import GoogleAuth from "common/GoogleAuth/GoogleAuth";

import {
  Button,
  CardTitle,
  CardWrapper,
  Form,
  Input,
  Label,
  Text,
} from "../../common/common.styles";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const userContext = useContext(AuthContext);

  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.register,
    validateOnMount: true,
  });

  useEffect(() => {
    if (userContext.user) {
      navigate("/auth");
    }
  }, [userContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    toast.promise(
      createUser({ ...values, email: values.email.toLowerCase() })
        .then(() => {
          return navigate("/auth/account-created");
        })
        .finally(() => setIsLoading(false)),
      {
        pending: `${t('registering')}...`,
        success: `${t('registerSuccess')}`,
        error: {
          render({ data }) {
            return data.response.data.error;
          },
        },
      }
    );
  };

  return (
    <CardWrapper
      id="register-card-wrapper"
      isMobile={isMobile}
      border={isMobile ? "null" : ""}
    >
      <CardTitle>{t("register")}</CardTitle>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">
          <Text color={errors.name ? "orange" : "white"}>
            {t(errors.name) || t("username")}
          </Text>
          <Input
            type="text"
            placeholder="Username"
            name="name"
            value={values.name}
            onChange={handleChange}
            maxLength={20}
            required
          />
        </Label>
        <Label htmlFor="email">
          <Text color={errors.email ? "orange" : "white"}>
            {t(errors.email) || "Email:"}
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
          <Text color={errors.password ? "orange" : "white"}>
            {t(errors.password) || "Password:"}
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
          {t("createAccount")}
        </Button>
      </Form>
      <GoogleAuth text="Register" />
      <Button grayscale padding="5px" onClick={() => navigate("/auth")}>
        {t("backToLogin")}
      </Button>
    </CardWrapper>
  );
}

export default Register;
