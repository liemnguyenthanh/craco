import { useAppDispatch } from '@/store';
import { fetchRoomList } from '@/store/slices/chat';
import { getItemLocalStorage } from '@/utils/helpers';
import { useEffect, useRef } from 'react';
import HeadLeft from './headLeft';
import FormCreateRoom from './headLeft/createRoom';
import RoomList from './roomList';
import { StyledCreateRoom, StyledMain, StyledSecondWrap, StyledWrap } from './styles';

const LeftChat = () => {
   const user = getItemLocalStorage("user")
   const dispatch = useAppDispatch()
   const divRoomRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      dispatch(fetchRoomList(user._id))
   }, [dispatch, user])

   const handleToggleCreateRoom = () => {
      if (divRoomRef.current) {
         const isOpen = divRoomRef.current.classList.contains('open')
         divRoomRef.current.classList.toggle('open')
         divRoomRef.current.style.transform = isOpen ? 'translateX(0)' : `translateX(-50%)`
      }
   }

   return (
      <StyledWrap>
         <StyledSecondWrap ref={divRoomRef} sx={{ width: '200%'}}>
            <StyledMain>
               <HeadLeft handleToggleCreateRoom={handleToggleCreateRoom} />
               <RoomList />
            </StyledMain>
            <StyledCreateRoom>
               <FormCreateRoom handleToggleCreateRoom={handleToggleCreateRoom}/>
            </StyledCreateRoom>
         </StyledSecondWrap>
      </StyledWrap>
   );
};

export default LeftChat;
