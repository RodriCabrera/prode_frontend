import React, { useRef, useEffect } from 'react'
import { CardContainer, CardWrapper, CardTitle, Text } from '../../../../../common/common.styles'
import { ListElement } from '../../../../../common/Lists/ListElement'
import { UserMiniAvatar } from '../../../../../common/UserMiniAvatar/UserMiniAvatar'

export default function UserList({ users, displayInfo, handleClose }) {
    const listRef = useRef();

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (listRef.current && !listRef.current.contains(e.target)) {
          handleClose();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [listRef]);
  return (
    <CardContainer ref={listRef}>
        <CardWrapper>
            <CardTitle>{displayInfo.stage}</CardTitle>
            <Text align="center">Resultado: <span style={{color: displayInfo.color}}>{displayInfo.name}</span></Text>
            {users.map(user => {
                return <ListElement key={user._id} avatar={<UserMiniAvatar avatar={user.avatar} name={user.name} />}>
                    <Text>{user.name}</Text>
                </ListElement>
            })}
        </CardWrapper>
    </CardContainer>
  )
}
