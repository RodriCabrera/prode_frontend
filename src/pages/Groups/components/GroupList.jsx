import React from 'react';
import { Link } from 'react-router-dom';

function GroupList({ groups }) {
  return (
    <>
      {groups.length === 0 && <p>No perteneces a ningún grupo</p>}
      <ul>
        {groups.length > 0 &&
          groups.map((group) => (
            <li>
              <Link to={`/groups/${group.name}`}>{group.name}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default GroupList;
