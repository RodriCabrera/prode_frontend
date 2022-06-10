import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { getAvatars } from '../../../api/profiles';
import { Button } from '../../../common/common.styles';
import { Spinner } from '../../../common/Spinner/Spinner';

function AvatarList({ handleAvatarClick }) {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAvatarList, setShowAvatarList] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getAvatars()
      .then((res) => setAvatars(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Button
            grayscale={showAvatarList}
            padding="10px"
            weight="400"
            onClick={() => setShowAvatarList(!showAvatarList)}
            style={{ width: '100%' }}
          >
            {showAvatarList ? 'Ocultar' : 'Mostrar'} lista de avatares
          </Button>
          {showAvatarList &&
            avatars.map((avatar) => {
              return (
                <AvatarWrapper
                  key={avatar}
                  onClick={() => handleAvatarClick(avatar)}
                >
                  <Avatar src={avatar} alt="avatar" />
                </AvatarWrapper>
              );
            })}
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 40px;
`;

const AvatarWrapper = styled.div`
  border-radius: 100%;
  cursor: pointer;
  overflow: hidden;
`;
const Avatar = styled.img`
  width: 70px;
`;
export default AvatarList;
