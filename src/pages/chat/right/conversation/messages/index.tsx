import { Box } from '@mui/system'
import React, { Fragment, useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../store'
import { groupMessagesByTypeAndUser } from '../../../../../utils/helpers'
import MessageByAdmin from './messageByAdmin'
import MessagesByUser from './messagesByUser'

const MessagesList = () => {
  const messagesList = useSelector((state: RootState) => state.chat.messagesList)
  const wrapListRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const messageGroup = useMemo(() => {
    if (messagesList.length > 0) return groupMessagesByTypeAndUser(messagesList)
    return []
  }, [messagesList])


  useEffect(() => {
    if (wrapListRef.current && listRef.current
      //&& !isScrollToBottom
    ) {
      wrapListRef.current.scrollIntoView({ block: 'end' })
      //setIsScrollToBottom(true)
    } else {
      // listRef.current?.scrollBy(0, 46 * 20)
    }
  }, [messagesList])


  return (
    <Box ref={listRef}>
      <Box ref={wrapListRef}>
        {
          messageGroup.length > 0 &&
          messageGroup.map(item => (
            <Fragment key={item.key}>
              {item.type === 1 && <MessagesByUser messagesByUser={item.messages_user} />}
              {item.type === 2 && item.action && <MessageByAdmin message={item.action} />}
            </Fragment>
          ))
        }
      </Box>
    </Box>
  )
}

export default MessagesList
