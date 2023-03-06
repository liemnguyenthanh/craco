import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../store';
import { fetchMessageList, fetchRoomInfo } from '../../../../store/slices/chat';
import BodyConversation from './body';
import HeadConversation from './head';
import InputConversation from './input';
interface Props {
  roomId: string
}

const Conversation = ({ roomId }: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchRoomInfo(roomId))
    dispatch(fetchMessageList(roomId))
  }, [dispatch, roomId])

  return (
    <Box sx={{ height: '100%' }}>
      <HeadConversation />
      <BodyConversation />
      <InputConversation />
    </Box>
  )
}

export default Conversation
