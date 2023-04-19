
import { generalAvatar, getTimeMessage, last } from '@/utils/helpers';
import { IGroupMessageByUser } from '@/utils/types/messages';
import { IRoom } from '@/utils/types/rooms';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import ItemMessageUser from './itemMessageUser';
import { StyledList, StyledName, StyledWrap, styles } from './styles';
interface Props {
   usersMessages: IGroupMessageByUser;
   messageListRef: React.MutableRefObject<Array<React.RefObject<HTMLLIElement>>>;
   roomInfo: IRoom
}

const UsersMessages = ({ usersMessages, messageListRef, roomInfo }: Props) => {
   const isMe = useMemo(() => !!usersMessages.isMe, // eslint-disable-next-line 
      [])

   const getNameUser = (): string => {
      if (roomInfo.nickname && usersMessages.sender_id in roomInfo.nickname) {
         return roomInfo.nickname[usersMessages.sender_id]
      }

      return roomInfo.chatroom_participants.find(user => user._id === usersMessages.sender_id)?.username ?? ''
   }

   return (
      <StyledWrap justifyContent={isMe ? 'flex-end' : 'flex-start'}>
         {!isMe && <Avatar alt={usersMessages.sender_id} src={generalAvatar(usersMessages.sender_id)} />}
         <StyledList alignItems={isMe ? 'end' : 'start'}>
            {!usersMessages.isMe && <StyledName>{getNameUser()}</StyledName>}
            {usersMessages.messages.map(item => <ItemMessageUser
               key={item._id}
               messageListRef={messageListRef}
               isMe={isMe}
               roomInfo={roomInfo}
               message={item}
            />)}
            <Box sx={styles.time}>
               {getTimeMessage(last(usersMessages.messages)?.timestamp)}
            </Box>
         </StyledList>
      </StyledWrap>
   );
};

export default UsersMessages;