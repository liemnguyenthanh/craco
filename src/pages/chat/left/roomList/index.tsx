import { RootState } from '@/store';
import { toggleRoomList } from '@/utils/helpers';
import { IRoom } from '@/utils/types/rooms';
import { useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import RoomItem from '../roomItem';
import { StyledWrap, StyledWrapList } from './styles';

const RoomList = () => {
   const { roomList, roomsCommon } = useSelector((state: RootState) => state.chat)
   const [searchParams, setSearchParams] = useSearchParams()
   const roomActive = searchParams.get('room_id')?.toString()
   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.down('md'));

   const handleChangeRoom = (room: IRoom) => {
      if (!room._id || room._id === searchParams.get('room_id')) return;

      if (matches) toggleRoomList()

      setSearchParams({ room_id: room._id })
   }
   
   return (
      <StyledWrap>
         <StyledWrapList>
            {roomList.length > 0 &&
               roomList.map((roomId: string) => (
                  roomsCommon[roomId] && 
                  <RoomItem 
                     key={roomId} 
                     room={roomsCommon[roomId]} 
                     roomActive={roomActive} 
                     handleChangeRoom={handleChangeRoom} />
               ))}
         </StyledWrapList>
      </StyledWrap>
   );
};

export default RoomList;

