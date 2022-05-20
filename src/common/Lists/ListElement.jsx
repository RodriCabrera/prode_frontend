import propTypes from 'prop-types';
import { AvatarWrapper, Wrapper } from './Lists.styles';

function ListElement({ children, onClick, avatar }) {
  return (
    <Wrapper onClick={onClick} id="ListWrapper">
      <AvatarWrapper>{avatar}</AvatarWrapper>
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

export default ListElement;
