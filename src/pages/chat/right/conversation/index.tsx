import LoadingComponent from '@/components/loading';
import { HEIGHT_CHAT } from '@/constants/chats';
import { RootState, useAppDispatch } from '@/store';
import { fetchMessageList, fetchRoomInfo, setRoomIdActive } from '@/store/slices/chat';
import { getCurrentUser } from '@/utils/helpers';
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

const Conversation = ({ roomId }: Props) => {
   const { roomsCommon, messagesInRooms, isLoadingRoom, isLoadingMessageRoom, roomIdActive } = useSelector((state: RootState) => state.chat)
   const isExistRoom = useMemo(() => roomId in roomsCommon, // eslint-disable-next-line
      [roomId])
   const user = getCurrentUser()
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (!isExistRoom) {
         dispatch(fetchRoomInfo({ room_id: roomId, user_id: user._id }))
      }

      if (!(roomId in messagesInRooms)) {
         dispatch(fetchMessageList({ room_id: roomId }))
      }

      if (roomIdActive !== roomId) dispatch(setRoomIdActive(roomId))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [roomId])

   return (
      <Box sx={{ height: '100%', position: 'relative' }}>
         {isLoadingRoom ?
            <LoadingComponent /> :
            <Fragment>
               {roomsCommon[roomId] &&
                  <StyledMessageAndRoom>
                     <StyledMessages>
                        <HeadConversation />
                        <StyledWrapMessage>
                           {isLoadingMessageRoom ?
                              <LoadingComponent /> :
                              <MessagesAllRooms room={roomsCommon[roomId]} />}
                        </StyledWrapMessage>
                        <InputConversation />
                     </StyledMessages>
                     <RoomInfo />
                  </StyledMessageAndRoom>
               }
               {!roomsCommon[roomId] && <StyledNotFound>Not found Room</StyledNotFound>}
            </Fragment>}
      </Box>
   )
}

export default Conversation

const StyledMessageAndRoom = styled(Box)({
   display: 'flex',
   height: '100%',
})

const StyledWrapMessage = styled(Box)({
   maxWidth: '1000px',
   height: HEIGHT_CHAT,
   margin: '0 auto'
})

const StyledMessages = styled(Box)({
   flex: 1
})