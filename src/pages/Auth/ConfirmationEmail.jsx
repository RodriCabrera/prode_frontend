import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../../common/common.styles';

function ConfirmationEmail() {
  return (
    <PageWrapper>
      <h4 style={{ textAlign: 'center', marginTop: '3rem' }}>
        Cuenta creada con éxito. Por favor revisá tu email para completar el
        registro.
      </h4>
      <Link style={{ textAlign: 'center', color: 'orange' }} to="/login">
        Login
      </Link>
    </PageWrapper>
  );
}

export default ConfirmationEmail;
