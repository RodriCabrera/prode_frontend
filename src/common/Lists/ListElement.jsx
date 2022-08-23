import { AvatarWrapper, ListItemWrapper } from './Lists.styles';

export function ListElement({ children, onClick, avatar, bgColor }) {
  return (
    <ListItemWrapper onClick={onClick} id="ListWrapper">
      <AvatarWrapper bgColor={bgColor}>{avatar}</AvatarWrapper>
      {children}
    </ListItemWrapper>
  );
}
