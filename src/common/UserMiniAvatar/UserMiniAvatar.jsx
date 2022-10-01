import { HiUserCircle } from 'react-icons/hi';
import { useState } from 'react';

export function UserMiniAvatar({ name, avatar, isSmall, emptySize = '2rem' }) {
  const [isValid, setValid] = useState(true);
  return avatar && isValid ? (
    <img
      src={avatar}
      alt={name || 'user avatar'}
      style={{
        width: isSmall ? '30px' : '250px',
        height: isSmall ? '30px' : '250px',
        objectFit: 'cover',
        borderRadius: '100%',
        overflow: 'hidden',
        maxWidth: '350px',
        maxHeight: '350px',
      }}
      onError={() => setValid(false)}
    />
  ) : (
    <HiUserCircle size={emptySize} />
  );
}
