import { Box } from '@mui/material'
import MessagesList from './messages'

const BodyConversation = () => {

  return (
    <Box sx={{ height: 'calc(100vh - 230px)', p: "16px 16px 0 16px", overflowY: "scroll"}}>
      <MessagesList />
    </Box>
  )
}

export default BodyConversation
