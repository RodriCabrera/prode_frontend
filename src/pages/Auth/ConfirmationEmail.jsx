import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmationEmail() {
  return (
    <>
      <h4 style={{ textAlign: 'center', marginTop: '3rem' }}>
        Cuenta creada con éxito. Por favor revisá tu email para completar el
        registro.
      </h4>
      <Link style={{ textAlign: 'center', color: 'orange' }} to="/auth">
        Login
      </Link>
    </>
  );
}

export default ConfirmationEmail;
