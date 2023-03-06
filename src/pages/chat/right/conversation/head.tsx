import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'

const HeadConversation = () => {
  const roomInfo = useSelector((state: RootState) => state.chat.roomInfo)

  return (
    <Box sx={{
      height: '50px',
      borderBottom: 1,
      borderBottomColor: 'border.primary',
      display: 'flex',
      alignItems: "center", 
      p: '0 12px'
    }}>
      <Typography variant='h5' sx={{ color: 'text.primary' }}>{roomInfo?.chatroom_name}</Typography>
    </Box>
  )
}

export default HeadConversation
