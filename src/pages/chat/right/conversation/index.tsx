/* eslint-disable react-hooks/exhaustive-deps */
import LoadingComponent from '@/components/loading';
import { RootState, useAppDispatch } from '@/store';
import { fetchMessageList, fetchRoomInfo, setRoomIdActive } from '@/store/slices/chat';
import { getMyAccount } from '@/utils/helpers';
import { Box } from '@mui/material';
import { Fragment, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import HeadConversation from './headConversation';
import InputConversation from './inputConversation';
import MessagesAllRooms from './messagesAllRoom';
import { StyledNotFound } from './styles';
interface Props {
   roomId: string
}
/*
 -> check isExistRoom

 -> chưa có room thì load

 -> có rồi thì lấy room xong load

*/
const Conversation = ({ roomId }: Props) => {
   const { roomInfo, roomInfoList, notFoundRoom, isLoadingRoom, isLoadingMessageRoom } = useSelector((state: RootState) => state.chat)
   const isExistRoom = useMemo(() => roomId in roomInfoList, [roomId])
   const user = getMyAccount()
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (!isExistRoom) {
         dispatch(fetchRoomInfo(roomId))
      }
      dispatch(setRoomIdActive(roomId))
   }, [roomId])

   useEffect(() => {
      if (roomInfo && user._id && !isExistRoom) {
         dispatch(fetchMessageList({ room_id: roomId }))
      }
   }, [roomInfo])

   return (
      <Box sx={{ height: '100%', position: 'relative' }}>
         {isLoadingRoom ?
            <LoadingComponent /> :
            <Fragment>
               {roomInfoList[roomId] && !notFoundRoom &&
                  <Fragment>
                     <HeadConversation />
                     {isLoadingMessageRoom ?
                        <LoadingComponent /> :
                        <MessagesAllRooms roomId={roomId} room={roomInfoList[roomId]} />}
                     <InputConversation />
                  </Fragment>}
               {notFoundRoom && <StyledNotFound>Not found Room</StyledNotFound>}
            </Fragment>}
      </Box>
   )
}

export default Conversation

