import React from 'react';

function GroupList({ groups }) {
  return (
    <>
      {groups.length === 0 && <p>No perteneces a ningún grupo</p>}
      <ul>
        {groups.length > 0 && groups.map((group) => <li> {group.name}</li>)}
      </ul>
    </>
  );
}

export default GroupList;
