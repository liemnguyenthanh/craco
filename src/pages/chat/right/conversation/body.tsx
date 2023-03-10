import styled from '@emotion/styled'
import { Box } from '@mui/material'
import MessagesList from './messages'

const BodyConversation = () => {

  return (
    <Wrap>
      <MessagesList />
    </Wrap>
  )
}

export default BodyConversation

const Wrap = styled(Box)({
  height: 'calc(100vh - 230px)',
  p: "16px 16px 0 16px",
  overflowY: "scroll"
})
