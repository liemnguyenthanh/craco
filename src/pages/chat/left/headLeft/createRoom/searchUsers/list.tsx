import { colors } from "@/constants/theme"
import { generalAvatar } from "@/utils/helpers"
import { UserAccount } from "@/utils/types/accounts"
import styled from "@emotion/styled"
import { Avatar, Checkbox, ListItemText, MenuItem } from "@mui/material"
import { Box } from "@mui/system"

interface Props {
   list: UserAccount[],
   selectList: UserAccount[],
   handleSelect: (value: string) => void
}

const UsersList = ({ list, selectList, handleSelect }: Props) => {

   return (
      <Box sx={{ mt: 2 }}>
         {list.length > 0 ?
            list.map((user) => (
               <StyledMenuItem key={user._id} onClick={() => handleSelect(user._id)}>
                  <StyledCheckbox checked={selectList?.some(item => item._id === user._id)} />
                  <StyledAvatar src={generalAvatar(user._id)} alt='' />
                  <ListItemText primary={user.username} />
               </StyledMenuItem>))
            :
            <Box>Not found user</Box>
         }
      </Box>
   )
}

export default UsersList

export const StyledMenuItem = styled(MenuItem)({
   padding: '8px 4px',
   "&:hover": {
      backgroundColor: colors.blackLight,
      borderRadius: 4,
   }
})

export const StyledAvatar = styled(Avatar)({
   margin: '0 10px'
})

export const StyledCheckbox = styled(Checkbox)({
   '&.Mui-checked': {
      color: colors.purple,
   },
})
