import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProfile } from '../../api/profiles';
import { Spinner } from '../../common/Spinner/Spinner';
import {
  CardContainer,
  CardTitle,
  CardWrapper,
  //   Text
} from '../../common/common.styles';

function Profile() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [sharedGroups, setSharedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProfile(name)
      .then(({ data }) => {
        setProfile(data.profile);
        setSharedGroups(data.sharedGroups);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (
    <>
      {isLoading && <Spinner />}
      <CardContainer>
        <CardWrapper fullWidth>
          <CardTitle>{profile.name}</CardTitle>
        </CardWrapper>
      </CardContainer>
    </>
  );
}

export default Profile;
