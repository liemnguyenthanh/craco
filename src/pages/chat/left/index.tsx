import { Box } from '@mui/system';
import { useEffect } from 'react';
import LogoutButton from '../../../components/themeMode/buttons/logout';
import { useAppDispatch } from '../../../store';
import { fetchRoomList } from '../../../store/slices/chat';
import { getItemLocalStorage } from '../../../utils/helpers';
import RoomList from './roomList';

const LeftChat = () => {
  const user = getItemLocalStorage("user")
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchRoomList(user._id))
  }, [dispatch, user])
  
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <RoomList />
      <Box>
        <LogoutButton />
      </Box>
    </Box>
  );
};

export default LeftChat;
