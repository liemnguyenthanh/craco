import { RootState, useAppDispatch } from '@/store';
import { setIsOpenRoomList } from '@/store/slices/app';
import { useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import RoomItem from '../roomItem';
import { StyledWrap, StyledWrapList } from './styles';

const RoomList = () => {
   const { roomList, roomsCommon } = useSelector((state: RootState) => state.chat)
   const [searchParams] = useSearchParams()
   const roomActive = searchParams.get('room_id')?.toString()
   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.down('md'));
   const dispatch = useAppDispatch()

   const handleChangeRoom = () => {
      if (matches) dispatch(setIsOpenRoomList())
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

