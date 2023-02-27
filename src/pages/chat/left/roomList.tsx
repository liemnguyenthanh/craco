import List from '@mui/material/List';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import LogoutButton from '../../../components/themeMode/buttons/logout';
import { RootState } from '../../../store';
import RoomItem from '../left/roomItem';

const RoomList = () => {
  const usersOnline = useSelector((state: RootState) => state.socket.usersOnline)

  return (
    <Box
      sx={{
        border: 1,
        p: 1,
        borderRadius: 1,
        height: 'calc(100vh - 44px)',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ height: 'calc(100% - 60px)', overflow: 'scroll' }}>
        <List sx={{ width: '100%', height: '100%' }}>
          {
            usersOnline && 
            usersOnline?.length > 0 && 
            usersOnline.map((user) =>
              <RoomItem username={user.username} key={user.socketId} />
            )
          }
        </List>
      </Box>
      <Box>
        <LogoutButton />
      </Box>
    </Box>
  );
};

export default RoomList;
