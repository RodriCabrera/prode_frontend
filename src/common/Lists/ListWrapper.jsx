import styled from '@emotion/styled/macro';
import propTypes from 'prop-types';

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkorange;
  border-radius: 100%;
  height: 2.5rem;
  width: 2.5rem;
  transition: 0.2s;
`;

const GroupListElement = styled.div`
  display: flex;
  gap: 1rem;
  cursor: pointer;
  :hover ${AvatarWrapper} {
    background-color: orange;
    height: 3rem;
    width: 3rem;
  }
`;

function ListWrapper({ children, onClick, avatar }) {
  return (
    <GroupListElement onClick={onClick}>
      <AvatarWrapper>{avatar}</AvatarWrapper>
      {children}
    </GroupListElement>
  );
}

ListWrapper.propTypes = {
  children: propTypes.node.isRequired,
  onClick: propTypes.func.isRequired,
  avatar: propTypes.node.isRequired,
};

export default ListWrapper;