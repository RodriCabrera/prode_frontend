import { AvatarWrapper, HoverBaloon, ListItemWrapper } from "./Lists.styles";

interface IListElementProps {
  children: JSX.Element;
  onClick: () => void;
  avatar: string;
  bgColor: string;
  isMobile: boolean;
}

export function ListElement({
  children,
  onClick,
  avatar,
  bgColor,
  isMobile,
}: IListElementProps) {
  return (
    <ListItemWrapper onClick={onClick} isMobile={isMobile} id="ListWrapper">
      <HoverBaloon bgColor={bgColor} id="hoverbaloon" />
      <AvatarWrapper>{avatar}</AvatarWrapper>
      {children}
    </ListItemWrapper>
  );
}
