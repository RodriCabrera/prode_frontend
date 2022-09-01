import React, { useState } from 'react';
import { Button } from '../../common/common.styles';
import styled from '@emotion/styled';

export default function Cabecita() {
  const [showGame, setShowGame] = useState(true);
  const ContenedorJueguito = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  `;
  const VentanaJueguito = styled.iframe`
    position: relative;
    width: 100%;
    height: 100%;
  `;
  const ExitBtn = styled.button`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    border-radius: 50%;
    background-color: gray;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 999;
    color: white;
    height: 1.5rem;
    width: 1.5rem;
    padding: 0.2rem;
  `;
  return showGame ? (
    <ContenedorJueguito>
      <ExitBtn onClick={() => setShowGame(false)}>X</ExitBtn>
      <VentanaJueguito
        title="jueguito"
        src="games/Cabecita.html"
      ></VentanaJueguito>
    </ContenedorJueguito>
  ) : (
    <Button onClick={() => setShowGame(true)}>Jugar</Button>
  );
}
