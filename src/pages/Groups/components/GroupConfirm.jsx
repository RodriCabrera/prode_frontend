import React from 'react';
import { Text, CardTitle, Button } from '../../../common/common.styles';
import { translateDuration } from '../../pagesHelpers';

function GroupConfirm({ groupName, userGroupData, confirmText }) {
  return (
    userGroupData && (
      <>
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
      </>
    )
  );
}

export default GroupConfirm;
