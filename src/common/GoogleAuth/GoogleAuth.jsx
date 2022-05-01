import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import propTypes from 'prop-types';
import Container, { AuthLink } from './GoogleAuth.styles';
import config from '../../Constants';

function GoogleAuth({ text }) {
  return (
    <Container>
      <AuthLink href={`${config.API_URL}/auth/google`}>
        {text} with Google <FcGoogle size="2rem" />
      </AuthLink>
    </Container>
  );
}
GoogleAuth.propTypes = {
  text: propTypes.string.isRequired,
};

export default GoogleAuth;
