import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRef } from 'react';
import CustomRoom from './customRoom';
import { StyledBtnExpand, StyledContainerRoom, StyledRoom, StyledRoomWrap } from './styles';

const RoomInfo = () => {
   const roomRef = useRef<HTMLDivElement>(null)
   const btnRef = useRef<HTMLButtonElement>(null)

   const handleToggleRoom = () => {
      if (!roomRef.current || !btnRef.current) return;
      const width = roomRef.current.clientWidth
      const isToggle = width !== 0
      roomRef.current.style.transform = isToggle ? `translateX(${width}px)` : ''
      roomRef.current.style.width = isToggle ? `0` : ''
      btnRef.current.style.rotate = isToggle ? `180deg` : ''
   }

   return (
      <StyledRoomWrap>
         <StyledRoom ref={roomRef}>
            <StyledContainerRoom>
               {/* <ImagesList /> */}
               <CustomRoom/>
            </StyledContainerRoom>
         </StyledRoom>
         <StyledBtnExpand ref={btnRef} onClick={handleToggleRoom}>
            <ChevronRightIcon />
         </StyledBtnExpand>
      </StyledRoomWrap>
   )
}

export default RoomInfo
