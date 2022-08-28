import React, { useEffect, useState } from 'react';
import { getFixtureByStageId } from '../../../api/fixture';
import { CardTitle } from '../../../common/common.styles';
import useCleanupController from '../../../hooks/useCleanupController';
import FixtureTable from '../../FixturePage/components/FixtureTable';

const ShortFixture = () => {
  const [data, setData] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();

  useEffect(() => {
    getFixtureByStageId('GRUPOS', signal)
      .then((res) => {
        setData(
          res.data.fixture
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .splice(0, 5)
        );
      })
      .catch((err) => handleCancel(err))
      .finally(() => {});
    return cleanup;
  }, []);

  return (
    <div>
      <CardTitle>Próximos partidos:</CardTitle>
      {data ? (
        <FixtureTable
          id="short-fixture-card-container"
          data={data}
          isCompact
          fullWidth
        />
      ) : (
        <div>ASJHDGAHGSDGFAHGSDFAHGSDFAHGFSD</div>
      )}
    </div>
  );
};

export default ShortFixture;
