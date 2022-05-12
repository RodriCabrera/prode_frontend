import { isEmpty } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

function GroupList({ groups }) {
  if (isEmpty(groups)) {
    return <p>No perteneces a ningún grupo</p>;
  }

  return (
    <ul>
      {groups.length > 0 &&
        groups.map((group) => (
          <li key={group}>
            <Link to={`/groups/${group.name}`}>{group.name}</Link>
          </li>
        ))}
    </ul>
  );
}

export default GroupList;
