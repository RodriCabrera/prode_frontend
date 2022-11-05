import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "common/AuthProvider";
import { authSchema } from "validationSchemas/auth";
import { loginUser } from "api/auth";
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
import { useTranslation } from "react-i18next";

function Login() {
  const userContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.login,
    validateOnMount: true,
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (userContext.user) {
      navigate("/");
    }
  }, [userContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    toast.promise(
      loginUser({ ...values, email: values.email.toLowerCase() })
        .then((res) => {
          if (res?.data?.token) {
            localStorage.setItem("token", res.data.token);
            window.location.reload();
            return navigate("/");
          }
        })
        .finally(() => {
          setIsLoading(false);
        }),
      {
        pending: t("loginIn"),
        success: t("loginSuccess"),
        error: {
          render({ data }) {
            return data?.response?.data?.error || "Error al autenticar...";
          },
        },
      }
    );
  };
  const isMobile = useIsMobile();
  return (
    <CardWrapper
      id="login-card-wrapper"
      isMobile={isMobile}
      border={isMobile ? "null" : ""}
    >
      {!isMobile && <CardTitle>Login</CardTitle>}
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">
          <Text color={errors.email ? "orange" : ""}>
            {errors.email ? t(errors.email) : "Email:"}
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
          <Text color={errors.password ? "orange" : ""}>
            {errors.password ? t(errors.password) : "Password:"}
          </Text>
          <Input
            type="password"
            name="password"
            required
            placeholder={t("atLeast6")}
            value={values.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </Label>
        <Button type="submit" disabled={!isEmpty(errors) || isLoading}>
          LOGIN
        </Button>
        <GoogleAuth text="Login" />
        <Link to="forgot-password">{t("forgotPass")}</Link>
      </Form>
      <Button grayscale padding="8px" onClick={() => navigate("register")}>
        {t("firstTime")}
      </Button>
    </CardWrapper>
  );
}

export default Login;
