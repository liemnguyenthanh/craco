import { MESSAGE_USER } from '@/constants/chats';
import { RootState, useAppDispatch } from '@/store';
import { EVENTS_SOCKET } from '@/store/middleware/events';
import { createRequestMessage } from '@/utils/logics/messages';
import { showNotification } from '@/utils/notification';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Button } from '@mui/material';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { StyledInput, StyledSecondWrap, StyledWrap } from './styles';

const InputConversation = () => {
   const inputRef = useRef<HTMLInputElement>(null);
   const roomIdActive = useSelector((state: RootState) => state.chat.roomIdActive)
   const dispatch = useAppDispatch()

   const handleSendMessage = (event: React.FormEvent<HTMLDivElement>) => {
      event.preventDefault()
      const value = inputRef?.current?.value.trim();

      if (!value) return showNotification("Please input!!");
      if (!roomIdActive) return;

      const requestMessage = createRequestMessage(roomIdActive, value, MESSAGE_USER.MESSAGE_TEXT)
      dispatch({ type: EVENTS_SOCKET.SEND_MESSAGE, payload: requestMessage })

      if (inputRef.current) inputRef.current.value = ''
   }

   return (
      <StyledWrap>
         <StyledSecondWrap component='form' onSubmit={handleSendMessage}>
            <StyledInput
               inputRef={inputRef}
               placeholder='Write a message ...'
               autoComplete='off'
            />
            <Button type="submit">
               <TelegramIcon sx={{ color: "text.primary" }} />
            </Button>
         </StyledSecondWrap>
      </StyledWrap>
   );
};

export default InputConversation;
