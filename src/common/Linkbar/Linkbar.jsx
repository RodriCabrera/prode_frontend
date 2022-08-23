import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiPodiumWinner } from 'react-icons/gi';
import { FaListUl } from 'react-icons/fa';
import { BiFootball } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import {
  CustomLink,
  LinkbarContainer,
  LinkbarWrapper,
  LinkGroup,
  LinkWrapper,
} from './Linkbar.styles';

export function Linkbar({ isMobile }) {
  const location = useLocation();
  const basePath = location.pathname.split('/')[1];
  const navigate = useNavigate();

  const isCurrent = (link) => {
    return link === basePath;
  };
  const handleLinkClick = (path) => {
    return navigate(path);
  };

  return (
    <LinkbarContainer isMobile={isMobile} id="linkbar-container">
      <LinkbarWrapper>
        <LinkGroup id="button-group-left">
          <LinkWrapper
            onClick={() => handleLinkClick('/fixture')}
            isCurrent={isCurrent('fixture')}>
            {isMobile ? (
              <BiFootball
                size="2rem"
                color={isCurrent('fixture') ? 'pink' : ''}
              />
            ) : (
              <CustomLink>Fixture</CustomLink>
            )}
          </LinkWrapper>
          <LinkWrapper
            onClick={() => handleLinkClick('/predictions')}
            isCurrent={isCurrent('predictions')}>
            {isMobile ? (
              <FaListUl
                size="2rem"
                color={isCurrent('predictions') ? 'pink' : ''}
              />
            ) : (
              <CustomLink>Predicciones</CustomLink>
            )}
          </LinkWrapper>

          <LinkWrapper
            onClick={() => handleLinkClick('/scores')}
            isCurrent={isCurrent('scores')}>
            {isMobile ? (
              <GiPodiumWinner
                size="2rem"
                color={isCurrent('scores') ? 'pink' : ''}
              />
            ) : (
              <CustomLink>Puntajes</CustomLink>
            )}
          </LinkWrapper>
          <LinkWrapper
            onClick={() => handleLinkClick('/groups')}
            isCurrent={isCurrent('groups')}>
            {isMobile ? (
              <HiUserGroup
                size="2rem"
                color={isCurrent('groups') ? 'pink' : ''}
              />
            ) : (
              <CustomLink>Grupos</CustomLink>
            )}
          </LinkWrapper>
        </LinkGroup>
      </LinkbarWrapper>
    </LinkbarContainer>
  );
}
