import styled from '@emotion/styled'
import { Avatar, Box, Button, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { colors } from '@/constants/theme'
import { RootState, useAppDispatch } from '@/store'
import { RoomName } from './roomName'
import { generalAvatar } from '@/utils/helpers'
import { Fragment } from 'react'
import { setIsOpenSwipeRoomInfo } from '@/store/slices/app'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const HeadConversation = () => {
   const { roomsCommon, roomIdActive } = useSelector((state: RootState) => state.chat)
   const roomInfo = roomsCommon[roomIdActive]
   const dispatch = useAppDispatch()
   const toggleDrawerRoomInfo = () => dispatch(setIsOpenSwipeRoomInfo())

   if (!roomInfo) return <Fragment />

   return (
      <StyledWrap>
         <StyledInfoRoom>
            <Avatar
               sx={{ width: 56, height: 56, cursor: 'pointer' }}
               alt={roomInfo?.chatroom_name} src={generalAvatar(roomInfo._id)}
               onClick={toggleDrawerRoomInfo} />
            <Box>
               {roomInfo?.chatroom_name && <RoomName roomName={roomInfo.chatroom_name} />}
               <Typography variant='inherit' sx={{ fontSize: '12px', color: "#76ff03" }}>online</Typography>
            </Box>
         </StyledInfoRoom>
         <Button onClick={toggleDrawerRoomInfo}>
            <MoreVertIcon/>
         </Button>
         {/* <ActionRoom /> */}
      </StyledWrap>
   )
}

export default HeadConversation

const StyledWrap = styled(Box)({
   height: '100px',
   borderBottom: `1px solid ${colors.whiteDark}`,
   display: 'flex',
   alignItems: "center",
   justifyContent: 'space-between',
   padding: '0 16px',
   backgroundColor: colors.black,
})

const StyledInfoRoom = styled(Box)({
   display: "flex",
   gap: "8px"
})
