import { RootState } from '@/store';
import { IRoom } from '@/utils/types/rooms';
import { Collapse } from '@mui/material';
import { useSelector } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import RoomItem from '../roomItem';
import { StyledWrap, StyledWrapList } from './styles';

const RoomList = () => {
  const roomList = useSelector((state: RootState) => state.chat.roomList)

  return (
    <StyledWrap>
      <StyledWrapList>
        <TransitionGroup>
          {roomList?.length > 0 &&
            roomList.map((room: IRoom) =>
              <Collapse key={room._id}>
                <RoomItem room={room} />
              </Collapse>)}
        </TransitionGroup>
      </StyledWrapList>
    </StyledWrap>
  );
};

export default RoomList;

