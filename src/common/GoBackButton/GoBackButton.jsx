import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '../common.styles';

export function GoBackButton({ text }) {
  const navigate = useNavigate();
  return (
    <Text
      onClick={() => navigate(-1)}
      style={{ cursor: 'pointer', textDecoration: 'underline' }}
    >
      {text || 'Volver'}
    </Text>
  );
}
