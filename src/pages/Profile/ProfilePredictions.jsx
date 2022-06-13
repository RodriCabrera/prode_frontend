import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Spinner } from '../../common/Spinner/Spinner';
import {
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from '../../common/common.styles';
import { getOtherUserPredictionsByGroup } from '../../api/predictions';
import FixtureTable from '../Fixture/FixtureTable';

function ProfilePredictions({ props }) {
  const { group, user } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [otherUserPredictions, setOtherUserPredictions] = useState([]);
  const location = useLocation();
  console.log(location);
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
            <FixtureTable
              data={otherUserPredictions.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
              )}
              isCompact
            />
          </CardWrapper>
        </CardContainer>
      ) : (
        // !isLoading && (
        <Text align="center">
          {user.name} no ha hecho predicciones para {group.name}
        </Text>
        // )
      )}
    </>
  );
}

export default ProfilePredictions;
