import { AvatarWrapper, HoverBaloon, ListItemWrapper } from './Lists.styles';

export function ListElement({ children, onClick, avatar, bgColor }) {
  return (
    <ListItemWrapper onClick={onClick} id="ListWrapper">
      <HoverBaloon bgColor={bgColor} id="hoverbaloon" />
      <AvatarWrapper>{avatar}</AvatarWrapper>
      {children}
    </ListItemWrapper>
  );
}
