import LoadingComponent from '@/components/loading';
import { useAppDispatch } from '@/store';
import { fetchRoomList } from '@/store/slices/chat';
import { useEffect, useRef, useState } from 'react';
import HeadLeft from './headLeft';
import FormCreateRoom from './headLeft/createRoom';
import RoomList from './roomList';
import { StyledCreateRoom, StyledMain, StyledSecondWrap, StyledWrap } from './styles';

const LeftChat = () => {
   const dispatch = useAppDispatch()
   const divRoomRef = useRef<HTMLDivElement>(null)
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      setIsLoading(true)
      dispatch(fetchRoomList())
         .then(() => setIsLoading(false))
   }, [dispatch])

   const handleToggleCreateRoom = () => {
      if (divRoomRef.current) {
         const isOpen = divRoomRef.current.classList.contains('open')
         divRoomRef.current.classList.toggle('open')
         divRoomRef.current.style.transform = isOpen ? 'translateX(0)' : `translateX(-50%)`
      }
   }

   return (
      <StyledWrap>
         <StyledSecondWrap ref={divRoomRef} sx={{ width: '200%' }}>
            <StyledMain>
               <HeadLeft handleToggleCreateRoom={handleToggleCreateRoom} />
               {isLoading ? <LoadingComponent /> : <RoomList />}
            </StyledMain>
            <StyledCreateRoom>
               <FormCreateRoom handleToggleCreateRoom={handleToggleCreateRoom} />
            </StyledCreateRoom>
         </StyledSecondWrap>
      </StyledWrap>
   );
};

export default LeftChat;
