import React from 'react';
import styled from '@emotion/styled';
import { Text, CardTitle, Button } from '../../../common/common.styles';

const ConfirmWrapper = styled.div`
  min-width: 200px;
  width: 100%;
  display: flex;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
`;

function GroupConfirm({ groupName, userGroupData, confirmText }) {
  const translateDuration = (miliseconds) => {
    switch (miliseconds) {
      case 1000 * 60 * 60 * 1:
        return ' una hora antes del partido';
      case 1000 * 60 * 60 * 12:
        return ' doce horas antes del partido';
      case 1000 * 60 * 60 * 24:
        return ' un día antes del partido';
      case 1000 * 60 * 60 * 24 * 7:
        return ' una semana antes del partido';
      case 0:
      default:
        return ' el comienzo del partido';
    }
  };
  return (
    userGroupData && (
      <ConfirmWrapper>
        <CardTitle>{groupName}</CardTitle>
        {userGroupData.manifesto && (
          <>
            <Text size="1.2rem" withBottomBorder>
              Reglas
            </Text>
            <Text>{userGroupData.manifesto}</Text>
            <br />
          </>
        )}
        <Text size="1.2rem" withBottomBorder>
          Sistema de puntaje
        </Text>
        <div>
          <Text align="center" color="lightgreen">
            Resultado exacto: {userGroupData.scoring.FULL}
          </Text>
          <br />
          <Text align="center" color="yellow">
            Ganador: {userGroupData.scoring.WINNER}
          </Text>
          <br />
          <Text align="center" color="red">
            Resultado erróneo: {userGroupData.scoring.NONE}
          </Text>
        </div>
        <br />
        <Text size="1.2rem" withBottomBorder>
          Tiempos
        </Text>
        <Text>
          Puedes realizar predicciones hasta
          {translateDuration(userGroupData.timeLimit)}
        </Text>
        <br />
        <Button type="submit">{confirmText}</Button>
      </ConfirmWrapper>
    )
  );
}

export default GroupConfirm;
