import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { isEmpty } from 'lodash';
import { getGroupData, getGroupScores } from '../../api/groups';
import ListWrapper from '../../common/Lists/ListWrapper';
import { Spinner } from '../../common/Spinner/Spinner';

function GroupPage() {
  const { name } = useParams();
  const [group, setGroup] = useState({});
  const [scoresData, setScoresData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Implementar toast promise:
    getGroupData(name)
      .then(({ data }) => {
        setGroup(data.groupData);
      })
      .catch((error) => {
        // TODO: handle error : Mostrar el msg en el toast?
        if (error.request.status === 401) {
          alert('You are not a member of this group');
        } else if (error.request.status === 400) {
          alert('Group does not exist');
        } else {
          console.error(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getGroupScores(name)
      .then((res) => {
        setScoresData(res.data.scores);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {group.name && (
        <>
          <h1>{group.name}</h1>
          <h2>Admin: {group.owner.name}</h2>
          <h3>Members:</h3>
          {/* <ul>
            {group.members.map((member) => (
              <li key={member._id}>{member.name}</li>
            ))}
          </ul> */}
          {isEmpty(scoresData)
            ? 'Loading member scores...'
            : scoresData?.map((score) => (
                <ListWrapper
                  key={score.user}
                  avatar={<HiOutlineUserGroup size="1.8rem" />}
                >
                  <p>{`${score.user} : ${score.score} pts`}</p>
                </ListWrapper>
              ))}
        </>
      )}
    </>
  );
}

export default GroupPage;
