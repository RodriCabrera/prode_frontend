import { useEffect, useState } from 'react';
import { Spinner } from '../../common/Spinner/Spinner';
import {
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from '../../common/common.styles';
import { getOtherUserPredictionsByGroup } from '../../api/predictions';
import { FixtureTable } from '../FixturePage/components/FixtureTable';
import { GoBackButton } from '../../common/GoBackButton/GoBackButton';

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
          <CardWrapper border="none">
            <CardTitle>Predicciones para {group.name}</CardTitle>
            <GoBackButton />
            <FixtureTable
              data={otherUserPredictions.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
              )}
              isCompact
            />
          </CardWrapper>
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
