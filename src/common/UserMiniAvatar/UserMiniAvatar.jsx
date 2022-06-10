import { HiUserCircle } from 'react-icons/hi';

export function UserMiniAvatar({ name, avatar }) {
  return avatar ? (
    <img src={avatar} alt={name || 'user avatar'} />
  ) : (
    <HiUserCircle size="2.2rem" />
  );
}
