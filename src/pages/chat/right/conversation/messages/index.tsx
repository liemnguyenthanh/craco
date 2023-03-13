import { Box } from '@mui/system'
import { Fragment, useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import AdminMessages from './adminMessages'
import UsersMessages from './usersMessages'

const MessagesList = () => {
  const { messagesInRooms, roomInfo } = useSelector((state: RootState) => state.chat)
  const wrapListRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const messageListRef = useRef<Array<React.RefObject<HTMLLIElement>>>([]);

  const messageGroup = useMemo(() => {
    if (roomInfo && messagesInRooms && roomInfo._id in messagesInRooms) return messagesInRooms[roomInfo._id]
    return []
  }, [messagesInRooms, roomInfo])


  useEffect(() => {
    if (wrapListRef.current && listRef.current
      //&& !isScrollToBottom
    ) {
      wrapListRef.current.scrollIntoView({ block: 'end' })
      //setIsScrollToBottom(true)
    } else {
      // listRef.current?.scrollBy(0, 46 * 20)
    }
  }, [messagesInRooms])

  return (
    <Box ref={listRef}>
      <Box ref={wrapListRef}>
        {messageGroup.length > 0 &&
          messageGroup.map(item => (
            <Fragment key={item.key}>
              {item.type === 1 && <UsersMessages messageListRef={messageListRef} UsersMessages={item.messages_user} />}
              {item.type === 2 && item.action && <AdminMessages message={item.action} />}
            </Fragment>
          ))}
      </Box>
    </Box>
  )
}

export default MessagesList
