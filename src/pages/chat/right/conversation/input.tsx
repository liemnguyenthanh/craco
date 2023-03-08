import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useRef } from 'react';
import { showNotification } from '../../../../utils/notification';
import { RootState, useAppDispatch } from '../../../../store';
import { EVENTS_SOCKET } from '../../../../store/middleware/events';
import { useSelector } from 'react-redux';
import { getItemLocalStorage } from '../../../../utils/helpers';
const InputConversation = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const user = getItemLocalStorage("user")
  const roomInfo = useSelector((state: RootState) => state.chat.roomInfo)
  const dispatch = useAppDispatch()

  const handleSendMessage = () => {
    const value = inputRef?.current?.value.trim();
    if (!value) showNotification("Please input!!");
    if (!user && !roomInfo._id) return;

    const requestMessage = {
      sender_id: user._id,
      room_id: roomInfo._id,
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
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 60px',
        borderTop: 0.5,
        borderTopColor: 'border.main'

      }}
    >
      <TextField
        inputRef={inputRef}
        sx={{ p: 1, width: '100%', '&:before': { border: 'none' } }}
        placeholder='Write a message ...'
        onKeyDown={onPressEnter}
      />
      <Button onClick={handleSendMessage}>
        <TelegramIcon sx={{ color: "text.primary" }} />
      </Button>
    </Box>
  );
};

export default InputConversation;
