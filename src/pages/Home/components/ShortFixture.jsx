import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { getFixtureByStageId } from '../../../api/fixture';
import { CardTitle, CardWrapper } from '../../../common/common.styles';
import useCleanupController from '../../../hooks/useCleanupController';
import { useIsMobile } from '../../../hooks/useIsMobile';
import FixtureTable from '../../FixturePage/components/FixtureTable';

const ShortFixtureCardWrapper = styled(CardWrapper)`
  min-height: 500px;
`;

const ShortFixture = () => {
  const [data, setData] = useState([]);
  const [signal, cleanup, handleCancel] = useCleanupController();
  const isMobile = useIsMobile();

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
    <ShortFixtureCardWrapper
      border={isMobile ? 'none' : undefined}
      isMobile={isMobile}
    >
      <CardTitle>Próximos partidos:</CardTitle>
      {data ? (
        <FixtureTable
          id="short-fixture-card-container"
          data={data}
          isCompact
          fullWidth
        />
      ) : (
        <div>Loading data...</div>
      )}
    </ShortFixtureCardWrapper>
  );
};

export default ShortFixture;
