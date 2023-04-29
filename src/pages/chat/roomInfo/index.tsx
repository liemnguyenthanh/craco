import { useSelector } from 'react-redux';
import CustomRoom from './customRoom';
import { StyledContainerRoom, StyledRoom, StyledRoomWrap, StyledTitleWrap } from './styles';
import { Button, SwipeableDrawer } from '@mui/material';
import { RootState, useAppDispatch } from '@/store';
import { setIsOpenSwipeRoomInfo } from '@/store/slices/app';
import CloseIcon from '@mui/icons-material/Close';

const RoomInfo = () => {
   const { isOpenSwipeRoomInfo } = useSelector((state: RootState) => state.app)
   const dispatch = useAppDispatch()
   const toggleDrawer = () => dispatch(setIsOpenSwipeRoomInfo())

   return (
      <SwipeableDrawer
         anchor='right'
         open={isOpenSwipeRoomInfo}
         onClose={toggleDrawer}
         onOpen={toggleDrawer}
      >
         <StyledRoomWrap>
            <StyledTitleWrap>
               <Button onClick={toggleDrawer}><CloseIcon/></Button>
            </StyledTitleWrap>
            
            <StyledRoom>
               <StyledContainerRoom>
                  {/* <ImagesList /> */}
                  <CustomRoom />
               </StyledContainerRoom>
            </StyledRoom>
         </StyledRoomWrap>
      </SwipeableDrawer>
   )
}

export default RoomInfo
