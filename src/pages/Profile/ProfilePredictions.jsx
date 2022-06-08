import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../common/Spinner/Spinner';
import {
  CardContainer,
  CardWrapper,
  CardTitle,
} from '../../common/common.styles';
import { getOtherUserPredictionsByGroup } from '../../api/predictions';

// TODO: Botón de vuelta al perfil del usuario

function ProfilePredictions() {
  const { id, group } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getOtherUserPredictionsByGroup(id, group)
      .then(({ data }) => {
        setPredictions(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {isLoading && <Spinner />}
      <CardContainer>
        <CardWrapper fullWidth>
          <CardTitle>Predicciones de ...</CardTitle>
          {
            // TODO: Display de las predicciones en la tabla
          }
        </CardWrapper>
      </CardContainer>
    </>
  );
}

export default ProfilePredictions;
