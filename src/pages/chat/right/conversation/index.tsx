import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store';
import { fetchMessageList, fetchRoomInfo } from '../../../../store/slices/chat';
import BodyConversation from './body';
import HeadConversation from './head';
import InputConversation from './input';
interface Props {
  roomId: string
}

const Conversation = ({ roomId }: Props) => {
  const dispatch = useAppDispatch()
  const roomInfo = useSelector((state: RootState) => state.chat.roomInfo)

  useEffect(() => {
    dispatch(fetchRoomInfo(roomId))
    dispatch(fetchMessageList(roomId))
  }, [dispatch, roomId])

  return (
    <Box sx={{ height: '100%' }}>
      {
        roomInfo ? <>
          <HeadConversation />
          <BodyConversation />
          <InputConversation />
        </> :
        <Typography
          sx={{
            textAlign: "center",
            paddingTop: 10,
            fontSize: 30
          }}
        >Not found Room</Typography>
      }

    </Box>
  )
}

export default Conversation
