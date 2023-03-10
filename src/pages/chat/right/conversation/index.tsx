import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store';
import { fetchMessageList, fetchRoomInfo, updateReadMessageInRoom } from '../../../../store/slices/chat';
import { getMyAccount } from '../../../../utils/helpers';
import BodyConversation from './body';
import HeadConversation from './head';
import InputConversation from './input';
interface Props {
  roomId: string
}

const Conversation = ({ roomId }: Props) => {
  const dispatch = useAppDispatch()
  const roomInfo = useSelector((state: RootState) => state.chat.roomInfo)
  const user = getMyAccount()

  useEffect(() => {
    dispatch(fetchRoomInfo(roomId))
    dispatch(fetchMessageList(roomId))
  }, [dispatch, roomId])

  useEffect(() => {
    if (roomInfo && user._id) {
      dispatch(updateReadMessageInRoom({ room_id: roomId, user_id: user._id, count: 0 }))
    }
  }, [roomInfo, dispatch, roomId, user])


  return (
    <Box sx={{ height: '100%' }}>
      {roomInfo ? 
      <Fragment>
        <HeadConversation />
        <BodyConversation />
        <InputConversation />
      </Fragment> :
      <NotFound>Not found Room</NotFound>}
    </Box>
  )
}

export default Conversation

const NotFound = styled(Typography)({
  textAlign: "center",
  paddingTop: 10,
  fontSize: 30
})
