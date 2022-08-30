import { AvatarWrapper, HoverBaloon, ListItemWrapper } from './Lists.styles';

export function ListElement({ children, onClick, avatar, bgColor, isMobile }) {
  return (
    <ListItemWrapper onClick={onClick} isMobile={isMobile} id="ListWrapper">
      <HoverBaloon bgColor={bgColor} id="hoverbaloon" />
      <AvatarWrapper>{avatar}</AvatarWrapper>
      {children}
    </ListItemWrapper>
  );
}
