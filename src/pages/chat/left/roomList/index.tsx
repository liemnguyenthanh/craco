import { RootState } from '@/store';
import { IRoom } from '@/utils/types/rooms';
import { Collapse } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import RoomItem from '../roomItem';
import { StyledWrap, StyledWrapList } from './styles';

const RoomList = () => {
   const roomList = useSelector((state: RootState) => state.chat.roomList)
   const [searchParams, setSearchParams] = useSearchParams()
   const roomActive = searchParams.get('room_id')?.toString()

   const handleChangeRoom = (room: IRoom) => {
      if (!room._id || room._id === searchParams.get('room_id')) return;
      setSearchParams({ room_id: room._id })
   }

   return (
      <StyledWrap>
         <StyledWrapList>
            <TransitionGroup>
               {roomList.length > 0 &&
                  roomList.map((room: IRoom) =>
                     <Collapse key={room._id}>
                        <RoomItem room={room} roomActive={roomActive} handleChangeRoom={handleChangeRoom} />
                     </Collapse>)}
            </TransitionGroup>
         </StyledWrapList>
      </StyledWrap>
   );
};

export default RoomList;

