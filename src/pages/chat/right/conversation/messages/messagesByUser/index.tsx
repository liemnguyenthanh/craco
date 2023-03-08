import { Avatar } from "@mui/material";
import { Box } from "@mui/system"
import { useMemo } from "react";
import { convertTime, getItemLocalStorage } from "../../../../../../utils/helpers";
import { IGroupMessageByUser } from "../../../../../../utils/types/messages"
import { styles } from "./styles";

interface Props {
  messagesByUser: IGroupMessageByUser | undefined
}

const getTimeMessage = (timestamp: number | undefined): string => {
  const date = convertTime(timestamp)
  if (!date) return ''
  return date?.getTimeMessage()
}

const MessagesByUser = ({ messagesByUser }: Props) => {
  const user = getItemLocalStorage("user");
  const isMySelf = useMemo((): boolean => {
    if (!messagesByUser) return false
    return user._id === messagesByUser.sender?._id
  }, [messagesByUser, user])

  if (!messagesByUser) return <></>

  return (
    <Box sx={styles.main(isMySelf)}>
      {!isMySelf &&
        <Box>
          <Avatar alt={messagesByUser.sender?._id} src="/static/images/avatar/1.jpg" />
        </Box>
      }
      <Box sx={styles.listMessage(isMySelf)}>
        {messagesByUser.messages.length > 0 &&
          messagesByUser.messages.map(message =>
            <Box
              sx={styles.message(isMySelf)}
              key={message._id}>{message.message_text}</Box>)}
        <Box sx={styles.time}>{getTimeMessage(messagesByUser.messages[messagesByUser.messages.length - 1]?.timestamp)}</Box>
      </Box>
    </Box>
  )
}

export default MessagesByUser
