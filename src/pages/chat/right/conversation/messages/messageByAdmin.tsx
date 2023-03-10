import { Box } from '@mui/system'
import { convertTime } from '../../../../../utils/helpers'
import { IMessage } from '../../../../../utils/types/messages'
import AlarmIcon from '@mui/icons-material/Alarm';
import styled from '@emotion/styled';
import { colors } from '../../../../../constants/theme';

interface Props {
  message: IMessage
}

const MessageByAdmin = ({ message }: Props) => {
  const date = convertTime(message.timestamp)

  return (
    <Wrap>
      <Content>
        {message.message_text} at {date && `${date.getTimeMessage()} ${date.getDayMonthYear()}`} <AlarmIcon />
      </Content>
    </Wrap>
  )
}

export default MessageByAdmin

const Wrap = styled(Box)({
  display: 'flex', 
  justifyContent: 'center' 
})

const Content = styled(Box)({
  textAlign: "center", 
  padding: '6px 12px',
  marginBottom: 6,
  border: `1px solid ${colors.whiteDark}`,
  fontSize: 12,
  backgroundColor: colors.blackLight,
  borderRadius: 10, 
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  gap: "4px"
})