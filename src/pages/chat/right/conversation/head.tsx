import { Avatar, Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'

const HeadConversation = () => {
  const roomInfo = useSelector((state: RootState) => state.chat.roomInfo)

  return (
    <Box sx={{
      height: '100px',
      borderBottom: 0.5,
      borderBottomColor: 'border.main',
      display: 'flex',
      alignItems: "center", 
      p: '0 16px'
    }}>
      <Box sx={{
        display: "flex",
        gap: "8px"
      }}>
        <Avatar 
          sx={{ width: 56, height: 56 }}
          alt={roomInfo?.chatroom_name} src="/static/images/avatar/1.jpg" />
        <Box>
          <Typography variant='h5'>{roomInfo?.chatroom_name}</Typography>
          <Typography variant='inherit' sx={{ fontSize: '12px', color: "#76ff03"}}>online</Typography>
        </Box>
      </Box>
      <Box>
      </Box>
    </Box>
  )
}

export default HeadConversation
