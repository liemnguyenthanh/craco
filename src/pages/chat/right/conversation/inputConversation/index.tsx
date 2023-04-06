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

   const handleSendMessage = () => {
      const value = inputRef?.current?.value.trim();
      if (!value) return showNotification("Please input!!");
      if (!roomIdActive) return;

      const requestMessage = createRequestMessage(roomIdActive, value, MESSAGE_USER.MESSAGE_TEXT)
      dispatch({ type: EVENTS_SOCKET.SEND_MESSAGE, payload: requestMessage })
      if (inputRef.current) inputRef.current.value = ''
   }

   const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') handleSendMessage()
   }

   // const handleSendMessageInterval = () => {
   //    const requestMessage = createRequestMessage(roomIdActive, generateRandomSentence(), TYPE_MESSAGE.CLIENT)
   //    dispatch({ type: EVENTS_SOCKET.SEND_MESSAGE, payload: requestMessage })
   // }

   // useEffect(() => {
   //    setInterval(() => {
   //       handleSendMessageInterval()
   //    }, 2000)
   // }, [])
   

   return (
      <StyledWrap>
         <StyledSecondWrap>
            <StyledInput
               inputRef={inputRef}
               placeholder='Write a message ...'
               onKeyDown={onPressEnter}
            />
            <Button onClick={handleSendMessage}>
               <TelegramIcon sx={{ color: "text.primary" }} />
            </Button>
         </StyledSecondWrap>
      </StyledWrap>
   );
};

export default InputConversation;
