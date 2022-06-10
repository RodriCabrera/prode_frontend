import React, { useEffect, useState } from 'react';
import { Spinner } from '../../common/Spinner/Spinner';
import { CardContainer, CardTitle, Text } from '../../common/common.styles';
import { getOtherUserPredictionsByGroup } from '../../api/predictions';

function ProfilePredictions({ props }) {
  const { group, user } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [otherUserPredictions, setOtherUserPredictions] = useState([]);

  useEffect(() => {
    if (!group || !user) return;
    setIsLoading(true);
    getOtherUserPredictionsByGroup(user._id, group._id)
      .then(({ data }) => {
        setOtherUserPredictions(data);
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props]);

  return (
    <>
      {isLoading && <Spinner />}
      {otherUserPredictions.length > 0 ? (
        <CardContainer>
          <CardTitle>Predicciones para {group.name}</CardTitle>
          {
            // TODO: Display de las predicciones en la tabla
          }
        </CardContainer>
      ) : (
        !isLoading && (
          <Text align="center">
            {user.name} no ha hecho predicciones para {group.name}
          </Text>
        )
      )}
    </>
  );
}

export default ProfilePredictions;
