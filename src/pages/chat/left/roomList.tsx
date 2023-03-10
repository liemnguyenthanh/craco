import styled from '@emotion/styled';
import List from '@mui/material/List';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import { colors } from '../../../constants/theme';
import { RootState } from '../../../store';
import { IRoom } from '../../../utils/types/rooms';
import RoomItem from '../left/roomItem';

const RoomList = () => {
  const roomList = useSelector((state: RootState) => state.chat.roomList)

  return (
    <Wrap>
      <WrapList>
        <TransitionGroup>
          {roomList?.length > 0 &&
           roomList.map((room: IRoom) => <RoomItem room={room} key={room._id} />)}
        </TransitionGroup>
      </WrapList>
    </Wrap>
  );
};

export default RoomList;

const Wrap = styled(Box)({
  height: 'calc(100% - 72px)',
  overflow: 'scroll',
  borderBottom: `1px solid ${colors.whiteDark}`,
})

const WrapList = styled(List)({
  width: '100%', 
  height: '100%', 
  padding: 0
})