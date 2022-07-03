import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ToggleSwitch from '../../common/ToggleSwitch';
import {
  BannerTitle,
  PredictionsPageWrapper,
  ToggleContainer,
} from './Predictions.styles';
import { getUserGroups } from '../../api/groups';
import { GroupSelector } from './components/GroupSelector';

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

      {userGroupList.length > 1 && (
        <GroupSelector
          isLoading={isLoading}
          selectedUserGroup={selectedUserGroup}
          userGroupList={userGroupList}
          handleGroupSelect={handleGroupSelect}
        />
      )}

      <ToggleContainer>
        <ToggleSwitch mode={mode} setMode={setMode} />
      </ToggleContainer>
      <Outlet context={{ mode, selectedUserGroup }} />
    </PredictionsPageWrapper>
  );
}

export default Predictions;
