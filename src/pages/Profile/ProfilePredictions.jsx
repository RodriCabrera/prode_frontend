import { useEffect, useState } from 'react';
import { Spinner } from '../../common/Spinner/Spinner';
import { CardContainer, CardTitle, Text } from '../../common/common.styles';
import { getOtherUserPredictionsByGroup } from '../../api/predictions';
import FixtureTable from '../Fixture/FixtureTable';

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
          {/* <FixtureTable data={{}}/> */}
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
