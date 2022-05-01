import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import propTypes from 'prop-types';

function GoogleAuth({ text }) {
  return (
    <a href="http://localhost:8080/auth/google">
      {text} with <FcGoogle size="2rem" />
    </a>
  );
}
GoogleAuth.propTypes = {
  text: propTypes.string.isRequired,
};

export default GoogleAuth;
