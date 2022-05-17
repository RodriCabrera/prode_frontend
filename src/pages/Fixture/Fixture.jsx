import React, { useEffect, useState } from 'react';
import { getFixture } from '../../api/fixture';
import FixtureTable from './FixtureTable';

function Fixture() {
  const [fixtureData, setFixtureData] = useState([]);

  useEffect(() => {
    // getGroupStage()
    getFixture().then((res) => {
      setFixtureData(res.data);
    });
  }, []);

  const renderGroupsTables = () => {
    const groups = fixtureData.fixture?.filter(
      (stage) => stage.name === 'Primera fase'
    )[0];
    if (groups) {
      return (
        <div>
          <h2>{groups?.name}</h2>
          <FixtureTable data={groups[0]} />
        </div>
      );
    }
    return <p>Loading</p>;
    // return groups.filter((elem) => elem.name === 'Primera fase')[0];
  };

  return (
    <div>
      <h1>coso</h1>
      {renderGroupsTables()}
    </div>
  );
}

export default Fixture;
