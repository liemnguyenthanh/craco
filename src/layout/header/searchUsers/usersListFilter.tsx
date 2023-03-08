import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/rootReducers"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography } from "@mui/material";
import { UserAccount } from "../../../utils/types/accounts";
import { useAppDispatch } from "../../../store";
import { ICreateChatRoom } from "../../../utils/types/rooms";
import { getMyAccount } from "../../../utils/helpers";
import { createRoom } from "../../../store/slices/chat";

export const UsersListFilter = () => {
  const usersByName = useSelector((state: RootState) => state.user.usersByName)
  const dispatch = useAppDispatch()
  const handleCreateRoom = (user: UserAccount) => {
    const myAccount = getMyAccount()
    if (!myAccount) return;
    const room: ICreateChatRoom = {
      chatroom_name: user.username,
      chatroom_participants: [
        user._id,
        myAccount._id
      ],
      created_by_user_id: myAccount._id
    }
    dispatch(createRoom(room))
  }
  return (
    <Box sx={{
      backgroundColor: 'background.secondary',
      width: '344px',
      p: 1,
      borderRadius: '0 0 10px 10px',
      boxShadow: '3px 3px 3px -3px #cccccc60'
    }}>
      {
        usersByName.length > 0 ?
          usersByName.map(user =>
            <Box key={user._id}
              sx={{
                p: '5px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <Typography>{user.username}</Typography>
              <PersonAddIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => handleCreateRoom(user)} />
            </Box>)
          :
          <Box>Not found</Box>
      }
    </Box>
  )
}
