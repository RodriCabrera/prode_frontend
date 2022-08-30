import { HiUserCircle } from 'react-icons/hi';

export function UserMiniAvatar({ name, avatar, isSmall, emptySize = '2rem' }) {
  return avatar ? (
    <img
      src={avatar}
      alt={name || 'user avatar'}
      style={isSmall && { width: '30px' }}
    />
  ) : (
    <HiUserCircle size={emptySize} />
  );
}
