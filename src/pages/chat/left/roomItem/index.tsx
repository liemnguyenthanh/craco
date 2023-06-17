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
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { ListItemButton } from '@mui/material';
import { colors } from '@/constants/theme';
interface Props {
   room: IRoom,
   roomActive?: string,
   handleChangeRoom: () => void
}

const RoomItem = ({ room, roomActive, handleChangeRoom }: Props) => {

   if (!room._id) return <Fragment />

   return (
      <ListItem
         sx={{ color: colors.white, p: 0 }}
         component={Link}
         to={`/chat?room_id=${room._id}`}
         alignItems="flex-start"
         onClick={handleChangeRoom}>
         <ListItemButton sx={{
            backgroundColor: roomActive === room._id ? "background.active" : "background.default",
            borderRadius: 3,
            cursor: 'pointer',
            padding: 1.25,
            '&:hover': {
               backgroundColor: roomActive === room._id ? "background.active" : "auto",
            }
         }}>
            <ListItemAvatar sx={{ minWidth: 50 }}>
               <Avatar alt={room.chatroom_name} src={generalAvatar(room._id)} />
            </ListItemAvatar>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} flex={1}>
               <ListItemText
                  primary={<StyledMessage>{room.chatroom_name}</StyledMessage>}
                  secondary={
                     <StyledMessage color="text.primary">
                        {room.last_message?.message_id && convertMessageRoomToText(room.last_message.message_id, room)}
                     </StyledMessage>
                  }
               />
               <StyledRight>
                  {room.last_message?.timestamp && <Typography fontSize={8}>{getTimeMessage(room.last_message.timestamp)}</Typography>}
                  {room.unread_count === 0 ?
                     <StyledUnReadMessage /> :
                     <StyledReadMessage>{room.unread_count}</StyledReadMessage>}
               </StyledRight>
            </Box>
         </ListItemButton>
      </ListItem>
   )
}

export default RoomItem
