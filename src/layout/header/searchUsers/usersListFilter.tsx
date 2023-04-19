import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import { RootState } from "@/store/rootReducers"
import { Typography } from "@mui/material";
import { UserAccount } from "@/utils/types/accounts";
import { useAppDispatch } from "@/store";
import { getCurrentUser } from "@/utils/helpers";
import { createRoom } from "@/store/slices/chat";
import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { createNewRoom } from "@/utils/logics/rooms";

export const UsersListFilter = () => {
   const usersByName = useSelector((state: RootState) => state.user.usersByName)
   const dispatch = useAppDispatch()

   const handleCreateRoom = (user: UserAccount) => {
      const myAccount = getCurrentUser()
      if (!myAccount) return;
      const room = createNewRoom('__', [user._id], false)
      if (room) dispatch(createRoom(room))
   }

   return (
      <StyledWrap>
         {usersByName.length > 0 ?
            usersByName.map(user =>
               <StyledUsers key={user._id}>
                  <Typography>{user.username}</Typography>
                  <PersonAddIcon
                     sx={{ cursor: 'pointer' }}
                     onClick={() => handleCreateRoom(user)} />
               </StyledUsers>)
            :
            <StyledNotFound>Not found</StyledNotFound>
         }
      </StyledWrap>
   )
}

const StyledWrap = styled(Box)({
   width: '344px',
   overflow: 'hidden',
})

const StyledUsers = styled(Box)({
   cursor: 'pointer',
   padding: '6px 12px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   "&:hover": {
      backgroundColor: colors.purple
   }
})

const StyledNotFound = styled(Box)({
   padding: '6px 12px',
   textAlign: 'center'
})
