import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { useSearchParams } from 'react-router-dom';
import { colors } from '../../../constants/theme';
import Conversation from './conversation';

const RightChat = () => {
  const [searchParams] = useSearchParams()
  const roomId = searchParams.get("room_id")

  return (
    <Wrap>
      {roomId ?
        <Conversation roomId={roomId} /> :
        <ChooseRoom>Vui lòng chọn room chat!!</ChooseRoom>}
    </Wrap>
  );
};

export default RightChat;

const Wrap = styled(Box)({
  borderLeft: `1px solid ${colors.whiteDark}`,
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
})


const ChooseRoom = styled(Box)({
  display: 'flex',
  justifyContent: "center",
  alignItems: 'center',
  height: '100%',
  fontSize: 40
})