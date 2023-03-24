import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useRef } from 'react';
import { showNotification } from '@/utils/notification';
import { RootState, useAppDispatch } from '@/store';
import { EVENTS_SOCKET } from '@/store/middleware/events';
import { useSelector } from 'react-redux';
import { getItemLocalStorage } from '@/utils/helpers';
import { StyledInput, StyledWrap } from './styles';

const InputConversation = () => {
   const inputRef = useRef<HTMLInputElement>(null);
   const user = getItemLocalStorage("user")
   const roomIdActive = useSelector((state: RootState) => state.chat.roomIdActive)
   const dispatch = useAppDispatch()

   const handleSendMessage = () => {
      const value = inputRef?.current?.value.trim();
      if (!value) showNotification("Please input!!");
      if (!user && !roomIdActive) return;

      const requestMessage = {
         sender_id: user._id,
         room_id: roomIdActive,
         message_text: value,
         timestamp: new Date().getTime()
      }
      dispatch({ type: EVENTS_SOCKET.SEND_MESSAGE, payload: requestMessage })
      if (inputRef.current) inputRef.current.value = ''
   }

   const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') handleSendMessage()
   }
   return (
      <StyledWrap>
         <StyledInput
            inputRef={inputRef}
            placeholder='Write a message ...'
            onKeyDown={onPressEnter}
         />
         <Button onClick={handleSendMessage}>
            <TelegramIcon sx={{ color: "text.primary" }} />
         </Button>
      </StyledWrap>
   );
};

export default InputConversation;
