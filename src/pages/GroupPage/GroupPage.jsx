import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupData } from '../../api/groups';
import { Spinner } from '../../common/Spinner/Spinner';

function GroupPage() {
  const { name } = useParams();
  const [group, setGroup] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getGroup = () => {
    setIsLoading(true);
    getGroupData(name)
      .then(({ data }) => {
        setGroup(data.groupData);
      })
      .catch((error) => {
        // TODO: handle error
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
  };
  useEffect(() => {
    console.log(name);
    getGroup();
  }, []);
  return (
    <>
      {isLoading && <Spinner />}
      {group.name && (
        <>
          <h1>{group.name}</h1>
          <h2>Admin: {group.owner.name}</h2>
          <h3>Members:</h3>
          <ul>
            {group.members.map((member) => (
              // eslint-disable-next-line no-underscore-dangle
              <li key={member._id}>{member.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default GroupPage;
