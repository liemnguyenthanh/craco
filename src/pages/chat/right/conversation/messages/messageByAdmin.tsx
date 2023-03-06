import { Box } from '@mui/system'
import { convertTime } from '../../../../../utils/helpers'
import { IMessage } from '../../../../../utils/types/messages'
import AlarmIcon from '@mui/icons-material/Alarm';

interface Props {
  message: IMessage
}

const MessageByAdmin = ({ message }: Props) => {
  const date = convertTime(message.timestamp)

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          textAlign: "center", p: 0.6, mb: 1,
          border: 1,
          borderColor: "border.primary",
          fontSize: "12px",
          backgroundColor: "active.main", borderRadius: 1, width: "fit-content",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}
      >
        {message.message_text} at {date && `${date.getTimeMessage()} ${date.getDayMonthYear()}`} <AlarmIcon />
      </Box>
    </Box>
  )
}

export default MessageByAdmin
