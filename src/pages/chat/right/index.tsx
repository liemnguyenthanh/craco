import { Box } from '@mui/system';
import { useSearchParams } from 'react-router-dom';
import Conversation from './conversation';

const RightChat = () => {
  const [searchParams] = useSearchParams()
  const roomId = searchParams.get("room_id")

  return (
    <Box
      sx={{
        borderLeft: 1,
        borderLeftColor: 'border.primary',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}>
      {
        roomId ?
          <Conversation roomId={roomId} /> :
          <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '100%', fontSize: 40 }}>
            Vui lòng chọn room chat!!
          </Box>
      }
    </Box>
  );
};

export default RightChat;
