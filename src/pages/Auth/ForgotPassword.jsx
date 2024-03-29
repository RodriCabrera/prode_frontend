import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { authSchema } from "../../validationSchemas/auth";
import { forgotPassword } from "../../api/auth";
import { useIsMobile } from "../../hooks/useIsMobile";

import {
  Button,
  CardTitle,
  CardWrapper,
  Form,
  Input,
  Label,
} from "../../common/common.styles";

function ForgotPassword() {
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: authSchema.forgotPassword,
    validateOnMount: true,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(
      forgotPassword({ ...values, email: values.email.toLowerCase() }),
      {
        pending: `${t('userFetch')}`,
        success: `${t('mailSent')} ${values.email}`,
        error: {
          render({ data }) {
            return data?.response.data?.error;
          },
        },
      }
    );
  };
  const isMobile = useIsMobile();

  return (
    <CardWrapper
      isMobile={isMobile}
      border={isMobile ? "null" : ""}
      id="change-password-card-wrapper"
      bg="black"
    >
      <>
        <CardTitle>{t('passRecovery')}</CardTitle>
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
          <Button disabled={!isEmpty(errors)}>{t('passRecovery')}</Button>
          <Button grayscale padding="8px" onClick={() => navigate("/auth")}>
            {t('goBackLogin')}
          </Button>
        </Form>
      </>
    </CardWrapper>
  );
}

export default ForgotPassword;
