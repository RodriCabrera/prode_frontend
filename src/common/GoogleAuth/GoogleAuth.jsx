import axios from 'axios';
import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
// import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import config from '../../Constants';
import Container, { AuthLink } from './GoogleAuth.styles';

function GoogleAuth({ text }) {
  const [showError, setShowError] = useState(false);

  const responseGoogle = async (response) => {
    const res = await axios.post(
      `${config.API_URL}/auth/google`,
      {
        token: response.tokenId,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      window.location.reload();
    } else {
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
              {text} con Google <FcGoogle size="1.2rem" />
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
