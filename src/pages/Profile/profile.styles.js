import styled from "@emotion/styled";

export const BigAvatarWrapper = styled.div`
  margin: auto;
  border-radius: 100%;
  overflow: hidden;
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const UserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
export const AvatarEditWrapper = styled.div`
  cursor: pointer;
  position: relative;
  height: inherit;
  width: inherit;
  & > div {
    opacity: 0;
  }
  :hover {
    background: rgba(0,0,0,0.5);
    & > img {
      opacity: 50%;
    }
    & > div {
      opacity: 100%;
    }
  }
  :active {
    background: initial;
    & > img {
      opacity: 100%;
    }
  }
`;
export const AvatarOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 40px;
`;
export const AvatarWrapper = styled.div`
  border-radius: 100%;
  cursor: pointer;
  overflow: hidden;
  min-height: 70px;
  min-width: 70px;
  border: ${({ selected }) =>
    selected ? "2px inset tomato" : "2px inset rgba(0, 0, 0, 0)"};
  background-color: darkgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const Avatar = styled.img`
  width: 70px;
  /* filter: grayscale(${({ selected }) => (selected ? "30%" : "100%")}); */
`;