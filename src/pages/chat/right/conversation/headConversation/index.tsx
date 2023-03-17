import styled from '@emotion/styled'
import { Avatar, Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { colors } from '@/constants/theme'
import { RootState } from '@/store'
import ActionRoom from '../actions'
import { RoomName } from './roomName'

const HeadConversation = () => {
  const { roomInfoList, roomIdActive} = useSelector((state: RootState) => state.chat)
  const roomInfo = roomInfoList[roomIdActive] 

  return (
    <Wrap>
      <InfoRoom>
        <Avatar
          sx={{ width: 56, height: 56 }}
          alt={roomInfo?.chatroom_name} src="/static/images/avatar/1.jpg" />
        <Box>
          {roomInfo?.chatroom_name && <RoomName roomName={roomInfo.chatroom_name} />}
          <Typography variant='inherit' sx={{ fontSize: '12px', color: "#76ff03" }}>online</Typography>
        </Box>
      </InfoRoom>
      <ActionRoom />
    </Wrap>
  )
}

export default HeadConversation

const Wrap = styled(Box)({
  height: '100px',
  borderBottom: `1px solid ${colors.whiteDark}`,
  display: 'flex',
  alignItems: "center",
  justifyContent: 'space-between',
  padding: '0 16px'
})

const InfoRoom = styled(Box)({
  display: "flex",
  gap: "8px"
})
