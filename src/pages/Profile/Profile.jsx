import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { getProfile } from '../../api/profiles';
import { Spinner } from '../../common/Spinner/Spinner';
import {
  CardContainer,
  CardTitle,
  CardWrapper,
  Text,
} from '../../common/common.styles';
import { ListWrapper } from '../../common/Lists/Lists.styles';
import ListElement from '../../common/Lists/ListElement';

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
  // TODO: Agregar un elemento para el avatar -->
  // ? A la derecha, izq, arriba, abajo del nombre? Grande?
  return (
    <>
      {isLoading && <Spinner />}
      <CardContainer>
        <CardWrapper fullWidth>
          <CardTitle>{profile.name}</CardTitle>
        </CardWrapper>
      </CardContainer>
      {sharedGroups.length > 0 ? (
        <>
          <Text>Predicciones de {profile.name}:</Text>
          <ListWrapper>
            {sharedGroups.map((group) => (
              // TODO: mandar el navigate a una página donde pueda ver las predicciones de este usuario para el grupo
              <ListElement
                key={group._id}
                onClick={() => navigate(`/groups/${group.name}`)}
                avatar={<HiOutlineUserGroup size="1.8rem" />}
              >
                <Text>{group.name}</Text>
              </ListElement>
            ))}
          </ListWrapper>
        </>
      ) : (
        <Text align="center">No compartes ningún grupo con este usuario</Text>
      )}
    </>
  );
}

export default Profile;
