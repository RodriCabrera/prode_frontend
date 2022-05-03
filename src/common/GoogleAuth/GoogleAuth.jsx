import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import config from '../../Constants';
import Container, { AuthLink } from './GoogleAuth.styles';

function GoogleAuth() {
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }
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
      setCookie('jwt', response.tokenId, 30);
      window.location.reload();
    }
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
