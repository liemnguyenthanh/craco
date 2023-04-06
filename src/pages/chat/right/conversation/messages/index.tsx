
import LoadMoreComponent from '@/components/loadmore'
import { TYPE_MESSAGE } from '@/constants/chats'
import { RootState, useAppDispatch } from '@/store'
import { fetchLoadMoreMessageList, updateReadMessageInRoom } from '@/store/slices/chat'
import { IMessagesInRoom } from '@/utils/types/chats'
import { IRoom } from '@/utils/types/rooms'
import { Box } from '@mui/system'
import { Fragment, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import AdminMessages from './adminMessages'
import { StyledScrollToBottom, StyledWrap } from './styles'
import UsersMessages from './usersMessages'

interface Props {
   messagesInRoom: IMessagesInRoom,
   roomInfo: IRoom
}

function MessagesList({ messagesInRoom, roomInfo }: Props) {
   const isLoadMoreMessageRoom = useSelector((state: RootState) => state.chat.isLoadMoreMessageRoom)
   const dispatch = useAppDispatch()
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

   const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      const element = event.currentTarget
      if (element.scrollTop === 0 && messagesInRoom.shouldLoadMore) {
         dispatch(fetchLoadMoreMessageList({ room_id: roomInfo._id, timestamp: messagesInRoom.firstMessage.timestamp }))
      }
      isBottomScroll.current = element.scrollHeight - element.scrollTop - element.clientHeight < 50
   }

   const handlePositionScroll = () => {
      if (wrapSecondRef.current && wrapFirstRef.current) {
         const hasScroll = wrapFirstRef.current.clientHeight - wrapSecondRef.current.clientHeight < 0

         if (!hasScroll) {
            if (roomInfo.unread_count > 0) handleReadMessage()

            return
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
         setTimeout(() => {
            handleReadMessage()
         }, 50)
      }
   }

   const handleReadMessage = () => dispatch(updateReadMessageInRoom({ room_id: roomInfo._id, count: 0 }))

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
                     {item.type === TYPE_MESSAGE.CLIENT &&
                        item.messages_user &&
                        item.messages_user.messages.length > 0 &&
                        <UsersMessages messageListRef={messageListRef} roomInfo={roomInfo} usersMessages={item.messages_user} />}

                     {item.type === TYPE_MESSAGE.ADMIN && item.action &&
                        <AdminMessages messageListRef={messageListRef} message={item.action} />}
                  </Fragment>))}
            </Box>
         </StyledWrap>
      </Box>
   )
}

export default MessagesList
