import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import axios from "axios";
import GoogleLogin from "react-google-login";
import propTypes from "prop-types";
import { useTranslation } from "react-i18next";

import config from "../../Constants";

import Container, { AuthLink } from "./GoogleAuth.styles";

function GoogleAuth({ text }) {
  const [showError, setShowError] = useState(false);
  const { t } = useTranslation();

  const responseGoogle = async (response) => {
    toast(t("loginValidation"));
    const res = await axios.post(
      `${config.API_URL}/auth/google`,
      {
        token: response.tokenId,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status === 200 && res.data.token) {
      localStorage.setItem("token", res.data.token);
      window.location.reload();
      toast.success(t("loginSuccess"));
    } else {
      toast.error(t("loginError"));
      setShowError(true);
    }
  };

  return (
    <>
      {showError && <p>Please try again</p>}
      <Container>
        <GoogleLogin
          clientId="468076309040-gaddvkpp6tj8fpm5utn6e3fbbrj0jel2.apps.googleusercontent.com"
          buttonText="Login with Google"
          render={(renderProps) => (
            <AuthLink
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {text} {t("withGoogle")} <FcGoogle size="1.2rem" />
            </AuthLink>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </Container>
    </>
  );
}

GoogleAuth.propTypes = {
  text: propTypes.string.isRequired,
};

export default GoogleAuth;
