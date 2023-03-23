import { Box } from '@mui/system'
import { convertTime } from '@/utils/helpers'
import { IMessage } from '@/utils/types/messages'
import AlarmIcon from '@mui/icons-material/Alarm';
import styled from '@emotion/styled';
import { colors } from '@/constants/theme';
import { useEffect, useRef } from 'react';

interface Props {
   message: IMessage,
   messageListRef: React.MutableRefObject<Array<React.RefObject<HTMLLIElement>>>;
}

const AdminMessages = ({ messageListRef, message }: Props) => {
   const date = convertTime(message.timestamp)
   const itemRef = useRef<HTMLLIElement>(null);

   useEffect(() => {
      messageListRef.current.push(itemRef);
   }, []);

   return (
      <Wrap ref={itemRef}>
         <Content>
            {message.message_text} at {date && `${date.getTimeMessage()} ${date.getDayMonthYear()}`}<AlarmIcon />
         </Content>
      </Wrap>
   )
}

export default AdminMessages

const Wrap = styled(Box)({
   display: 'flex',
   justifyContent: 'center'
})

const Content = styled(Box)({
   textAlign: "center",
   padding: '6px 12px',
   marginBottom: 6,
   border: `1px solid ${colors.whiteDark}`,
   fontSize: 12,
   backgroundColor: colors.blackLight,
   borderRadius: 10,
   width: "fit-content",
   display: "flex",
   alignItems: "center",
   gap: "4px"
})