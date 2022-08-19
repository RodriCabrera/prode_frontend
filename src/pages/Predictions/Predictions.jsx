import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ToggleSwitch from '../../common/ToggleSwitch/ToggleSwitch';
import { BannerTitle, PredictionsPageWrapper } from './Predictions.styles';
import { Text } from '../../common/common.styles';
import { getUserGroups } from '../../api/groups';
import { GroupSelector } from './components/GroupSelector';
import { Spinner } from '../../common/Spinner/Spinner';

function Predictions() {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('results');
  const [userGroupList, setUserGroupList] = useState([]);
  const [selectedUserGroup, setSelectedUserGroup] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUserGroups()
      .then(({ data }) => {
        setUserGroupList(data);
        if (data.length === 1) {
          setSelectedUserGroup(data[0]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleGroupSelect = (group) => {
    setSelectedUserGroup(group);
  };

  return (
    <PredictionsPageWrapper id="mi-prode-container">
      <BannerTitle align="center">PREDICCIONES</BannerTitle>

      {userGroupList.length > 0 ? (
        <GroupSelector
          isLoading={isLoading}
          selectedUserGroup={selectedUserGroup}
          userGroupList={userGroupList}
          handleGroupSelect={handleGroupSelect}
        />
      ) : (
        <>
          {isLoading && <Spinner />}
          {!isLoading && (
            <Text align="center" size="1.3rem">
              No perteneces a ningún grupo para hacer predicciones...
            </Text>
          )}
        </>
      )}

      {userGroupList.length > 0 && (
        <>
          <ToggleSwitch mode={mode} setMode={setMode} />
          <Outlet context={{ mode, selectedUserGroup }} />
        </>
      )}
    </PredictionsPageWrapper>
  );
}

export default Predictions;
