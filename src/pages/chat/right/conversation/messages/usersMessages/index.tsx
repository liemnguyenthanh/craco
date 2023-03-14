import { Avatar, List } from '@mui/material';
import { Box } from '@mui/system';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getTimeMessage } from '@/utils/helpers';
import { IGroupMessageByUser } from '@/utils/types/messages';
import ItemMessageUser from './item';
import { styles } from './styles';
interface Props {
   UsersMessages: IGroupMessageByUser | undefined;
   messageListRef: React.MutableRefObject<Array<React.RefObject<HTMLLIElement>>>;
}

const UsersMessages = ({ UsersMessages, messageListRef }: Props) => {
   if (!UsersMessages) return <></>;

   return (
      <Box sx={styles.main(UsersMessages.isMe)}>
         {!UsersMessages.isMe && (
            <Avatar
               alt={UsersMessages.sender?._id}
               src='/static/images/avatar/1.jpg'
            />
         )}
         <List sx={styles.listMessage(UsersMessages.isMe)}>
            <TransitionGroup>
               {UsersMessages.messages.length > 0 &&
                  UsersMessages.messages.map((message, index) => (
                     <CSSTransition
                        nodeRef={messageListRef.current[index]}
                        timeout={500}
                        key={message._id}
                        classNames='fade'
                     >
                        <ItemMessageUser
                           messageListRef={messageListRef}
                           isMe={UsersMessages.isMe}
                           message={message}
                        />
                     </CSSTransition>
                  ))}
            </TransitionGroup>
            <Box sx={styles.time}>
               {getTimeMessage(
                  UsersMessages.messages[UsersMessages.messages.length - 1]
                     ?.timestamp
               )}
            </Box>
         </List>
      </Box>
   );
};

export default UsersMessages;
