import propTypes from 'prop-types';
import { AvatarWrapper, Wrapper } from './Lists.styles';

export function ListElement({ children, onClick, avatar, bgColor }) {
  return (
    <Wrapper onClick={onClick} id="ListWrapper">
      <AvatarWrapper bgColor={bgColor}>{avatar}</AvatarWrapper>
      {children}
    </Wrapper>
  );
}

ListElement.propTypes = {
  children: propTypes.node.isRequired,
  onClick: propTypes.func,
  avatar: propTypes.node.isRequired,
};

ListElement.defaultProps = {
  onClick: () => {
    console.log('onClick');
  },
};
