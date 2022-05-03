import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import config from '../../Constants';
import Container, { AuthLink } from './GoogleAuth.styles';

function GoogleAuth() {
  const responseGoogle = (response) => {
    axios.post(
      `${config.API_URL}/auth/google`,
      {
        token: response.tokenId,
      },
      {
        withCredentials: true,
      }
    );
  };

  return (
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
            Login with Google <FcGoogle size="2rem" />
          </AuthLink>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn
        cookiePolicy="single_host_origin"
      />
    </Container>
  );
}

export default GoogleAuth;
