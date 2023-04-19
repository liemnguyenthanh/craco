
import LoadMoreComponent from '@/components/loadmore'
import { MESSAGE_ROOM_INFO, MESSAGE_USER } from '@/constants/chats'
import { RootState, useAppDispatch } from '@/store'
import { EVENTS_SOCKET } from '@/store/middleware/events'
import { clearNewMessage, fetchLoadMoreMessageList, updateRoomHasNewMessage } from '@/store/slices/chat'
import { IMessagesInRoom } from '@/utils/types/chats'
import { IRoom } from '@/utils/types/rooms'
import { Box } from '@mui/system'
import { Fragment, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import AdminMessages from './adminMessages'
import { StyledScrollToBottom, StyledWrap } from './styles'
import UsersMessages from './usersMessages'
import { createRequestReadMessage } from '@/utils/logics/messages'
import { debounce } from '@/utils/helpers'

interface Props {
   messagesInRoom: IMessagesInRoom,
   roomInfo: IRoom
}

function MessagesList({ messagesInRoom, roomInfo }: Props) {
   const dispatch = useAppDispatch()
   const { isLoadMoreMessageRoom, newMessage } = useSelector((state: RootState) => state.chat)
   const wrapFirstRef = useRef<HTMLDivElement>(null)
   const wrapSecondRef = useRef<HTMLDivElement>(null)
   const messageListRef = useRef<Array<React.RefObject<HTMLLIElement>>>([])
   let isBottomScroll = useRef<boolean>(false)
   let preHeightWrapList = useRef<number>(0)
   let isFirstRender = useRef<boolean>(true)

   useEffect(() => {
      handlePositionScroll()
      // eslint-disable-next-line
   }, [messagesInRoom])

   useEffect(() => {
      if (newMessage) {
         dispatch(updateRoomHasNewMessage({ room_id: roomInfo._id, isBottomScroll: isBottomScroll.current }))
         dispatch(clearNewMessage())

         if (isBottomScroll.current) {
            handleReadMessage()
         }
      }
      // eslint-disable-next-line
   }, [newMessage])

   const handleReadMessage = () => {
      const payload = createRequestReadMessage(roomInfo._id, roomInfo.last_message?.message_id._id, 0)
      dispatch({ type: EVENTS_SOCKET.READ_MESSAGE_CLIENT, payload })
   }

   const debounceReadMessage = debounce(handleReadMessage)

   const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      const element = event.currentTarget

      if (element.scrollTop === 0 && messagesInRoom.shouldLoadMore) {
         dispatch(fetchLoadMoreMessageList({ room_id: roomInfo._id, timestamp: messagesInRoom.firstMessage.timestamp }))
      }

      isBottomScroll.current = element.scrollHeight - element.scrollTop - element.clientHeight < 50

      if (isBottomScroll.current && roomInfo.unread_count > 0) {
         debounceReadMessage()
      }
   }

   const handlePositionScroll = () => {
      if (wrapSecondRef.current && wrapFirstRef.current) {
         const hasScroll = wrapFirstRef.current.clientHeight - wrapSecondRef.current.clientHeight < 0

         if (!hasScroll) {
            if (roomInfo.unread_count > 0) handleReadMessage()
            return;
         }

         //smooth scroll tới tin nhắn chưa đọc
         if (isFirstRender.current) {
            if (roomInfo.unread_count > 0) {
               //  FIXME: handle if un read messages bigger than 30
               const index = messageListRef.current.length - roomInfo.unread_count
               const element = messageListRef?.current[index]?.current

               if (element) {
                  wrapFirstRef.current.scrollTop = element.offsetTop - wrapFirstRef.current.clientHeight + element.clientHeight
               }
            } else {
               wrapSecondRef.current.scrollIntoView({ block: 'end' })
            }
            preHeightWrapList.current = wrapSecondRef.current.scrollHeight
            isFirstRender.current = false
            return
         }

         //smooth scroll khi có tin nhắn mới nếu thanh scroll ở đáy
         if (isBottomScroll.current) {
            wrapFirstRef.current.scroll({ top: wrapSecondRef.current.scrollHeight, behavior: 'smooth' })
            return
         }

         //scroll tới vị trí tin nhắn mới load khi kéo lên 
         if (!isBottomScroll.current && messagesInRoom.list.length > 0) {
            const positionScroll = wrapSecondRef.current.scrollHeight - preHeightWrapList.current
            wrapFirstRef.current.scrollBy(0, positionScroll)
            preHeightWrapList.current = wrapSecondRef.current.scrollHeight
         }
      }
   }

   const handleScrollBottom = () => {
      if (wrapSecondRef.current) {
         wrapSecondRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
         if (roomInfo.unread_count > 0) handleReadMessage()
      }
   }

   return (
      <Box className="message-list__wrap" sx={{ position: 'relative' }}>
         <LoadMoreComponent isLoading={isLoadMoreMessageRoom} />
         {roomInfo.unread_count > 0 && <StyledScrollToBottom onClick={handleScrollBottom}>{roomInfo.unread_count}</StyledScrollToBottom>}
         <StyledWrap ref={wrapFirstRef}
            className="list-message"
            onScroll={handleScroll}>
            <Box ref={wrapSecondRef} className="wrap-list-message">
               {messagesInRoom.list.length > 0 && messagesInRoom.list.map(item => (
                  <Fragment key={item.key}>
                     {item.type in MESSAGE_USER &&
                        item.messages_user &&
                        item.messages_user.messages.length > 0 &&
                        <UsersMessages messageListRef={messageListRef} roomInfo={roomInfo} usersMessages={item.messages_user} />}

                     {item.type in MESSAGE_ROOM_INFO && item.action &&
                        <AdminMessages messageListRef={messageListRef} roomInfo={roomInfo} message={item.action} />}
                  </Fragment>))}
            </Box>
         </StyledWrap>
      </Box>
   )
}

export default MessagesList
