import { colors } from "@/constants/theme"
import { generalAvatar } from "@/utils/helpers"
import styled from "@emotion/styled"
import DoneIcon from '@mui/icons-material/Done'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar, Button, Input, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { IUserNickname } from "."

interface Props {
   selectUser: string
   user: IUserNickname
   onSelectUser: (id: string) => void
   handleChangeNickname: (id: string, value: string) => void
}

const ItemNickname = ({ selectUser, onSelectUser, user, handleChangeNickname }: Props) => {
   const isSelect = user.user_id === selectUser

   const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         const value = event.currentTarget.value.trim()
         if (value) handleChangeNickname(user.user_id, value)
      }
   }
   
   return (
      <StyledItem
         sx={{ backgroundColor: isSelect ? colors.blackLight : 'initial' }}
         key={user.user_id} onClick={() => onSelectUser(user.user_id)}>
         <Avatar src={generalAvatar(user.user_id)} />
         <Box sx={{ flex: 1 }}>
            <StyledUsername>{user.username}</StyledUsername>
            {isSelect ?
               <StyledInput autoFocus defaultValue={user?.nickname} onKeyDown={onPressEnter} /> :
               <Box sx={{ fontSize: '12px' }}>{user?.nickname || 'Set nickname'}</Box>}
         </Box>
         <StyledBtn sx={{ backgroundColor: isSelect ? colors.green : colors.purple }}>
            {isSelect ? <StyledDone /> : <StyledEdit />}
         </StyledBtn>
      </StyledItem>
   )
}

export default ItemNickname

export const StyledItem = styled(Box)({
   cursor: 'pointer',
   display: 'flex',
   alignItems: 'center',
   gap: 10,
   padding: 10,
   borderRadius: 10
})

export const StyledUsername = styled(Typography)({
   fontSize: 18,
   color: colors.purple
})

export const StyledInput = styled(Input)({
   height: 20,
   fontSize: 12
})

export const StyledEdit = styled(EditIcon)({
   fontSize: 20
})

export const StyledDone = styled(DoneIcon)({
   fontSize: 20
})

export const StyledBtn = styled(Button)({
   padding: 2,
   minWidth: 40,
   minHeight: 40,
   borderRadius: '50%',
   textAlign: 'center',
   transition: 'transform 0.3s',

   "&:hover": {
      transform: 'scale(1.4)',
   }
})