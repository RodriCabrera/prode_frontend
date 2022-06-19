import React from 'react';

export function PredictionReferences() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <div style={{ backgroundColor: 'lightgreen', color: 'black' }}>
        Full: acertaste resultado
      </div>
      <div style={{ backgroundColor: '#FFFF66', color: 'black' }}>
        Half: acertaste ganador
      </div>
      <div style={{ backgroundColor: 'tomato', color: 'black' }}>No suma</div>
      <div style={{ backgroundColor: 'silver', color: 'black' }}>
        No evaluado
      </div>
    </div>
  );
}
