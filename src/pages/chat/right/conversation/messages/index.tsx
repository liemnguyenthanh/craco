/* eslint-disable react-hooks/exhaustive-deps */
import { TYPE_MESSAGE } from '@/constants/chats'
import { colors } from '@/constants/theme'
import { useAppDispatch } from '@/store'
import { fetchLoadMoreMessageList } from '@/store/slices/chat'
import { IMessagesInRoom } from '@/utils/types/chats'
import { IRoom } from '@/utils/types/rooms'
import styled from '@emotion/styled'
import { Box } from '@mui/system'
import { Fragment, useEffect, useRef } from 'react'
import AdminMessages from './adminMessages'
import UsersMessages from './usersMessages'

interface Props {
   messagesInRoom: IMessagesInRoom,
   roomInfo: IRoom
}

const MessagesList = ({ messagesInRoom, roomInfo }: Props) => {
   const dispatch = useAppDispatch()
   const wrapListRef = useRef<HTMLDivElement>(null)
   const listRef = useRef<HTMLDivElement>(null)
   const messageListRef = useRef<Array<React.RefObject<HTMLLIElement>>>([]);
   let isBottomScroll = useRef<boolean>(false)
   let oldWrapList = useRef<number>(0)
   let currentRoom = useRef<string | null>(null)

   useEffect(() => {
      handleScrollBottom()
   }, [roomInfo])


   useEffect(() => {
      handlePositionScroll()
   }, [messagesInRoom])

   const handleLoadMoreMessage = (event: React.UIEvent<HTMLDivElement>) => {
      const element = event.currentTarget
      if (element.scrollTop === 0 && messagesInRoom.shouldLoadMore) {
         dispatch(fetchLoadMoreMessageList({ room_id: roomInfo._id, timestamp: messagesInRoom.firstMessage.timestamp }))
      }

      isBottomScroll.current = element.scrollHeight - element.scrollTop - element.clientHeight < 50
   }

   const handleScrollBottom = () => {
      
      if (currentRoom.current === roomInfo._id) return;
      if (wrapListRef.current && messagesInRoom.list.length > 0) {
         console.log("zo day");
         
         wrapListRef.current.scrollIntoView({ block: 'end' })
         isBottomScroll.current = true
         oldWrapList.current = wrapListRef.current.scrollHeight
         currentRoom.current = roomInfo._id
      }
   }


   const handlePositionScroll = () => {
      if (wrapListRef.current && listRef.current) {
         //smooth scroll khi có tin nhắn mới nếu thanh scroll ở đáy
         if (isBottomScroll.current) {
            listRef.current.scroll({ top: wrapListRef.current.scrollHeight, behavior: 'smooth' });
            return;
         }

         //scroll tới vị trí tin nhắn mới load khi kéo lên 
         if (!isBottomScroll.current && messagesInRoom.list.length > 0) {
            const positionScroll = wrapListRef.current.scrollHeight - oldWrapList.current
            listRef.current.scrollBy(0, positionScroll);
         }
      }
   }

   return (
      <StyledWrap ref={listRef}
         className="list-message"
         onScroll={handleLoadMoreMessage}>
         <Box ref={wrapListRef} className="wrap-list-message">
            {messagesInRoom.list.length > 0 &&
               messagesInRoom.list.map(item => (
                  <Fragment key={item.key}>
                     {item.type === TYPE_MESSAGE.CLIENT &&
                        item.messages_user &&
                        item.messages_user.messages.length > 0 &&
                        <UsersMessages messageListRef={messageListRef} usersMessages={item.messages_user} />}

                     {item.type === TYPE_MESSAGE.ADMIN && item.action && <AdminMessages message={item.action} />}
                  </Fragment>
               ))}
         </Box>
      </StyledWrap>
   )
}

export default MessagesList


const StyledWrap = styled(Box)({
   height: 'calc(100vh - 230px)',
   padding: "16px 16px 0 16px",
   overflowY: "scroll",

   '&::-webkit-scrollbar': {
      width: '0.4em'
   },
   '&::-webkit-scrollbar-track': {
      'WebkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
   },
   '&::-webkit-scrollbar-thumb': {
      backgroundColor: colors.purple,
      outline: '1px solid slategrey'
   }
})
