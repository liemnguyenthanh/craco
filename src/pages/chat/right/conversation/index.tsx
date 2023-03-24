/* eslint-disable react-hooks/exhaustive-deps */
import LoadingComponent from '@/components/loading';
import { RootState, useAppDispatch } from '@/store';
import { fetchMessageList, fetchRoomInfo, setRoomIdActive } from '@/store/slices/chat';
import { getMyAccount } from '@/utils/helpers';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Fragment, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import RoomInfo from '../../roomInfo';
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
   const { roomInfo, roomInfoList, notFoundRoom, isLoadingRoom, isLoadingMessageRoom, roomIdActive } = useSelector((state: RootState) => state.chat)
   const isExistRoom = useMemo(() => roomId in roomInfoList, [roomId])
   const user = getMyAccount()
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (!isExistRoom) {
         dispatch(fetchRoomInfo({ room_id: roomId, user_id: user._id }))
      }
      if (roomIdActive !== roomId) dispatch(setRoomIdActive(roomId))
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
                  <StyledMessageAndRoom>
                     <StyledMessages>
                        <HeadConversation />
                        {isLoadingMessageRoom ?
                           <LoadingComponent /> :
                           <MessagesAllRooms roomId={roomId} room={roomInfoList[roomId]} />}
                        <InputConversation />
                     </StyledMessages>
                     <RoomInfo />
                  </StyledMessageAndRoom>
               }
               {notFoundRoom && <StyledNotFound>Not found Room</StyledNotFound>}
            </Fragment>}
      </Box>
   )
}

export default Conversation

const StyledMessageAndRoom = styled(Box)({
   display: 'flex' 
})

const StyledMessages = styled(Box)({
   flex: 1
})