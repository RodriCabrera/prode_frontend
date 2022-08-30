import React, { useEffect, useState } from 'react';
import { getFixtureByStageId } from '../../../api/fixture';
import { CardTitle, CardWrapper } from '../../../common/common.styles';
import { BallLoader } from '../../../common/Spinner/BallLoader';
import useCleanupController from '../../../hooks/useCleanupController';
import { useIsMobile } from '../../../hooks/useIsMobile';
import FixtureTable from '../../FixturePage/components/FixtureTable';

const ShortFixture = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();

  useEffect(() => {
    getFixtureByStageId('GRUPOS', signal)
      .then((res) => {
        setData(
          res.data.fixture
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .splice(0, 3)
        );
      })
      .catch((err) => handleCancel(err))
      .finally(() => {
        setIsLoading(false);
      });
    return cleanup;
  }, []);

  return (
    <CardWrapper
      border={isMobile ? 'none' : undefined}
      width="300px"
      minHeight="300px"
    >
      <CardTitle>Próximos partidos:</CardTitle>
      {isLoading && <BallLoader />}
      {data && (
        <FixtureTable
          id="short-fixture-card-container"
          data={data}
          isCompact
          fullWidth
        />
      )}
    </CardWrapper>
  );
};

export default ShortFixture;
