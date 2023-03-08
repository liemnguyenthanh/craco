import React from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IChatRoom } from '../../../utils/types/rooms';
import { useSearchParams } from 'react-router-dom';

interface Props {
  room: IChatRoom
}

const RoomItem = ({ room }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangeRoom = () => {
    if (!room._id) return;
    setSearchParams({ room_id: room._id })
  }

  const isActiveRoom: boolean = searchParams.get('room_id') === room._id
  return (
    <ListItem
      sx={{
        backgroundColor: isActiveRoom ? "background.secondary" : "background.default",
        cursor: 'pointer',
        borderBottom: 0.5,
        borderBottomColor: 'background.secondary',
      }}
      alignItems="flex-start" onClick={handleChangeRoom}>
      <ListItemAvatar>
        <Avatar alt={room.chatroom_name} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={room.chatroom_name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
            </Typography>
            {room.last_message?.message_id?.message_text}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default RoomItem
