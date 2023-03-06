import List from '@mui/material/List';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IChatRoom } from '../../../utils/types/rooms';
import RoomItem from '../left/roomItem';

const RoomList = () => {
  const roomList = useSelector((state: RootState) => state.chat.roomList)

  return (
    <Box sx={{ height: 'calc(100% - 60px)', overflow: 'scroll' }}>
      <List sx={{ width: '100%', height: '100%', p: 0 }}>
        {
          roomList?.length > 0 &&
          roomList.map((room: IChatRoom) =>
            <RoomItem room={room} key={room._id} />
          )
        }
      </List>
    </Box>
  );
};

export default RoomList;
