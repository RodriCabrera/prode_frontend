import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../../common/common.styles';

function ConfirmationEmail() {
  return (
    <PageContainer>
      <h4 style={{ textAlign: 'center', marginTop: '3rem' }}>
        Cuenta creada con éxito. Por favor revisá tu email para completar el
        registro.
      </h4>
      <Link style={{ textAlign: 'center', color: 'orange' }} to="/login">
        Login
      </Link>
    </PageContainer>
  );
}

export default ConfirmationEmail;
