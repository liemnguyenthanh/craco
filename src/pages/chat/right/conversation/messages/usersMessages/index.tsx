/* eslint-disable react-hooks/exhaustive-deps */
import { getTimeMessage, last } from '@/utils/helpers';
import { IGroupMessageByUser } from '@/utils/types/messages';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import ItemMessageUser from './itemMessageUser';
import { StyledList, StyledWrap, styles } from './styles';
interface Props {
   usersMessages: IGroupMessageByUser;
   messageListRef: React.MutableRefObject<Array<React.RefObject<HTMLLIElement>>>;
}

const UsersMessages = ({ usersMessages, messageListRef }: Props) => {
   const isMe = useMemo(() => !!usersMessages.isMe, [])

   return (
      <StyledWrap justifyContent={isMe ? 'flex-end': 'flex-start'}>
         {!isMe && <Avatar alt={usersMessages.sender?._id} src={usersMessages.sender?.avatar} />}
         <StyledList alignItems={isMe ? 'end' : 'start'}>
            {usersMessages.messages.map(item => <ItemMessageUser
               key={item._id}
               messageListRef={messageListRef}
               isMe={isMe}
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