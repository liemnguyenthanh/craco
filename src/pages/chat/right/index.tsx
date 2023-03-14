import { useSearchParams } from 'react-router-dom';
import Conversation from './conversation';
import { StyledChooseRoom, StyledWrap } from './styles';

const RightChat = () => {
  const [searchParams] = useSearchParams()
  const roomId = searchParams.get("room_id")

  return (
    <StyledWrap>
      {roomId ?
        <Conversation roomId={roomId} /> :
        <StyledChooseRoom>Vui lòng chọn room chat!!</StyledChooseRoom>}
    </StyledWrap>
  );
};

export default RightChat;
