import styled from '@emotion/styled';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button } from '@mui/material';
import Toggles from '@/components/themeMode/toggles';
const ActionRoom = () => {


  return (
    <Box>
      <Toggles
        buttonComponent={<MoreVertIcon />}
      >
        <Wrap >
          <Button>
            Leave room
          </Button>
        </Wrap>
      </Toggles>
    </Box>
  )
}


const Wrap = styled(Box)({
  padding: 10,
})
export default ActionRoom
