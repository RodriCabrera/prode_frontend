import { AvatarWrapper, Wrapper } from './Lists.styles';

export function ListElement({ children, onClick, avatar, bgColor }) {
  return (
    <Wrapper onClick={onClick} id="ListWrapper">
      <AvatarWrapper bgColor={bgColor}>{avatar}</AvatarWrapper>
      {children}
    </Wrapper>
  );
}
