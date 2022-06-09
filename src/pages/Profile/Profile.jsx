import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import ProfilePredictions from './ProfilePredictions';
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

// TODO: Definir: ==>
// ? Queda este componente como padre y router de Profile Edit y Profile Predictions
// ? Quedan así como están con simples links a c/u

function Profile() {
  const { name } = useParams();
  // const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [sharedGroups, setSharedGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupPredictions, setGroupPredictions] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getProfile(name)
      .then(({ data }) => {
        setProfile(data.profile);
        setSharedGroups(data.sharedGroups || []);
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
          {sharedGroups.length > 0 ? (
            <>
              <Text>Predicciones de {profile.name}:</Text>
              <ListWrapper>
                {sharedGroups.map((group) => (
                  <ListElement
                    key={group._id}
                    onClick={() =>
                      setGroupPredictions({
                        user: profile,
                        group,
                      })
                    }
                    avatar={<HiOutlineUserGroup size="1.8rem" />}
                  >
                    <Text>{group.name}</Text>
                  </ListElement>
                ))}
              </ListWrapper>
              {groupPredictions.group && (
                // TODO: Agregar una botón para dejar de ver las predicciones
                <ProfilePredictions props={groupPredictions} />
              )}
            </>
          ) : (
            <Text align="center">
              No compartes ningún grupo con este usuario
            </Text>
          )}
        </CardWrapper>
      </CardContainer>
    </>
  );
}

export default Profile;
