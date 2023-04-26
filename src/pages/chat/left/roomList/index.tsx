import { RootState } from '@/store';
import { IRoom } from '@/utils/types/rooms';
import { Collapse, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import RoomItem from '../roomItem';
import { StyledWrap, StyledWrapList } from './styles';
import { toggleRoomList } from '@/utils/helpers';

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
            <TransitionGroup style={{ padding: '0 10px' }}>
               {roomList.length > 0 &&
                  roomList.map((roomId: string) => {
                     if (roomsCommon[roomId]) {
                        return <Collapse key={roomId}>
                           <RoomItem room={roomsCommon[roomId]} roomActive={roomActive} handleChangeRoom={handleChangeRoom} />
                        </Collapse>
                     }
                     return <></>
                  })}
            </TransitionGroup>
         </StyledWrapList>
      </StyledWrap>
   );
};

export default RoomList;

