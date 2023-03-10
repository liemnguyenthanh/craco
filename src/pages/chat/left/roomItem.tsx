import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IRoom } from '../../../utils/types/rooms';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { getTimeMessage } from '../../../utils/helpers';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import styled from '@emotion/styled';
import { colors } from '../../../constants/theme';
interface Props {
  room: IRoom
}

const RoomItem = ({ room }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangeRoom = () => {
    if (!room._id) return;
    setSearchParams({ room_id: room._id })
  }

  const isActiveRoom: boolean = searchParams.get('room_id') === room._id
  return (
    <Wrap
      sx={{ backgroundColor: isActiveRoom ? "background.secondary" : "background.default" }}
      alignItems="flex-start"
      onClick={handleChangeRoom}>
      <ListItemAvatar>
        <Avatar alt={room.chatroom_name} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
        <ListItemText
          primary={room.chatroom_name}
          secondary={
            <Message variant="body2" color="text.primary">
              {room.last_message?.message_id?.message_text}
            </Message>
          }
        />
        <Right>
          <Typography sx={{ fontSize: '10px' }}>{getTimeMessage(room.last_message.timestamp)}</Typography>
          {room.unread_count === 0 ?
            <UnReadMessage /> :
            <ReadMessage>{room.unread_count}</ReadMessage>}
        </Right>
      </Box>
    </Wrap>
  )
}

export default RoomItem

const Wrap = styled(ListItem)({
  cursor: 'pointer',
  borderBottom: `1px solid ${colors.whiteDark}`
})

const ReadMessage = styled(Box)({
  fontSize: '12px',
  borderRadius: "50%",
  marginTop: 5,
  width: '18px',
  height: '18px',
  lineHeight: '18px',
  textAlign: 'center',
  backgroundColor: colors.purple,
});

const UnReadMessage = styled(DoneAllIcon)({
  fontSize: '14px',
  color: colors.green
})

const Message = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "1",
  WebkitBoxOrient: "vertical",
})

const Right = styled(Box)({
  width: '50px',
  textAlign: 'end'
})
