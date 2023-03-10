import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/rootReducers"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Typography } from "@mui/material";
import { UserAccount } from "../../../utils/types/accounts";
import { useAppDispatch } from "../../../store";
import { ICreateRoom } from "../../../utils/types/rooms";
import { getMyAccount } from "../../../utils/helpers";
import { createRoom } from "../../../store/slices/chat";
import styled from "@emotion/styled";
import { colors } from "../../../constants/theme";

export const UsersListFilter = () => {
  const usersByName = useSelector((state: RootState) => state.user.usersByName)
  const dispatch = useAppDispatch()
  const handleCreateRoom = (user: UserAccount) => {
    const myAccount = getMyAccount()
    if (!myAccount) return;
    const room: ICreateRoom = {
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
    <Wrap>
      {usersByName.length > 0 ?
        usersByName.map(user =>
          <Users key={user._id}>
            <Typography>{user.username}</Typography>
            <PersonAddIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => handleCreateRoom(user)} />
          </Users>)
        :
        <NotFound>Not found</NotFound>
      }
    </Wrap>
  )
}

const Wrap = styled(Box)({
  width: '344px',
  overflow: 'hidden',
})

const Users = styled(Box)({
  padding: '6px 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  "&:hover": {
    backgroundColor: colors.purple
  }
})

const NotFound = styled(Box)({
  padding: '6px 12px',
  textAlign: 'center'
})
