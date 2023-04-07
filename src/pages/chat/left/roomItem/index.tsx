import { generalAvatar, getTimeMessage } from '@/utils/helpers';
import { convertMessageRoomToText } from '@/utils/logics/messages';
import { IRoom } from '@/utils/types/rooms';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { StyledMessage, StyledReadMessage, StyledRight, StyledUnReadMessage } from './styles';
interface Props {
   room: IRoom,
   roomActive?: string,
   handleChangeRoom: (room: IRoom) => void
}

const RoomItem = ({ room, roomActive, handleChangeRoom }: Props) => {
   
   return (
      <ListItem
         sx={{
            backgroundColor: roomActive === room._id ? "background.active" : "background.default",
            borderRadius: 3,
            cursor: 'pointer',
            '&:hover': {
               backgroundColor: roomActive === room._id ? "background.active" : "auto",
            }
         }}
         alignItems="flex-start"
         button={true}
         onClick={() => handleChangeRoom(room)}>
         <ListItemAvatar sx={{ minWidth: 50 }}>
            <Avatar alt={room.chatroom_name} src={generalAvatar(room._id)} />
         </ListItemAvatar>
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
            <ListItemText
               primary={<StyledMessage>{room.chatroom_name}</StyledMessage>}
               secondary={
                  <StyledMessage color="text.primary">
                     {room.last_message?.message_id && convertMessageRoomToText(room.last_message.message_id, room)}
                  </StyledMessage>
               }
            />
            <StyledRight>
               <Typography sx={{ fontSize: '8px' }}>{getTimeMessage(room.last_message?.timestamp)}</Typography>
               {room.unread_count === 0 ?
                  <StyledUnReadMessage /> :
                  <StyledReadMessage>{room.unread_count}</StyledReadMessage>}
            </StyledRight>
         </Box>
      </ListItem>
   )
}

export default RoomItem
