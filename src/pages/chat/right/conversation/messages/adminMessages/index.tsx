import { colors } from '@/constants/theme';
import { convertMessageRoomToText } from '@/utils/logics/messages';
import { IMessage } from '@/utils/types/messages';
import { IRoom } from '@/utils/types/rooms';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';

interface Props {
   message: IMessage;
   messageListRef: React.MutableRefObject<Array<React.RefObject<HTMLLIElement>>>;
   roomInfo: IRoom
}

const AdminMessages = ({ messageListRef, message, roomInfo }: Props) => {
   const itemRef = useRef<HTMLLIElement>(null);

   useEffect(() => {
      messageListRef.current.push(itemRef);
      // eslint-disable-next-line
   }, []);

   return (
      <Wrap ref={itemRef}>
         <Content>
            {convertMessageRoomToText(message, roomInfo)}
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