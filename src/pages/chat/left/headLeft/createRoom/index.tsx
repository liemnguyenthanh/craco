import LoadingComponent from "@/components/loading"
import { RootState, useAppDispatch } from "@/store"
import { UserAccount } from "@/utils/types/accounts"
import styled from "@emotion/styled"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import SearchUser from "./searchUsers"
import UsersList from "./searchUsers/list"
import DoneIcon from '@mui/icons-material/Done';
import { colors } from "@/constants/theme"
import { createNewRoom } from "@/utils/logics/rooms"
import { createRoom } from "@/store/slices/chat"
import { useNavigate } from "react-router-dom"

interface Props {
   handleToggleCreateRoom: () => void
}

const FormCreateRoom = ({ handleToggleCreateRoom }: Props) => {
   const [usersSelected, setUsersSelected] = useState<UserAccount[]>([])
   const { usersByName, isFetchingUsers } = useSelector((state: RootState) => state.user)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const handleUnSelected = (index: number) => {
      const copyArr = [...usersSelected]
      copyArr.splice(index, 1)
      setUsersSelected(copyArr)
   }

   const handleSelectUser = (value: string) => {
      const user = usersByName.find(user => user._id === value)
      if (!user) return

      const newUserSelected = usersSelected.some(item => item._id === value)
         ? usersSelected.filter(select => select._id !== value)
         : [...usersSelected, user];

      setUsersSelected(newUserSelected);
   }

   const handleCreateRoom = () => {
      if (usersSelected.length < 2) return
      const room_name = usersSelected.map(item => item.username).join(', ')
      const room = createNewRoom(room_name, usersSelected.map(item => item._id), true)
      if (room) {
         dispatch(createRoom(room))
            .then((response: any) => handleCreatedRoomSuccess(response.payload?.room._id))
      }
         
   }

   const handleCreatedRoomSuccess = (roomId: string | null) => {
      if (roomId) navigate(`/chat?room_id=${roomId}`)
      setUsersSelected([])
      handleToggleCreateRoom()
   }

   return (
      <StyledWrap>
         <StyledWrapHeader>
            <StyledBtnIcon onClick={handleToggleCreateRoom}>
               <StyledIconBack />
            </StyledBtnIcon>
            <Typography variant="h5">Add Members</Typography>
         </StyledWrapHeader>
         <SearchUser usersSelected={usersSelected} handleUnSelected={handleUnSelected} />
         {isFetchingUsers ?
            <LoadingComponent /> :
            <UsersList list={usersByName} selectList={usersSelected} handleSelect={handleSelectUser} />}
         <StyledBtnCreate disabled={!(usersSelected.length > 1)} onClick={handleCreateRoom}>
            <DoneIcon />
         </StyledBtnCreate>
      </StyledWrap>
   )
}

export default FormCreateRoom

export const StyledWrap = styled(Box)({
   padding: 15
})

export const StyledWrapHeader = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 40
})

export const StyledIconBack = styled(ArrowBackIcon)({
   fontSize: 40,
   cursor: 'pointer'
})

export const StyledBtnIcon = styled(Button)({
   padding: 2,
   minWidth: 40,
   minHeight: 40,
   borderRadius: '50%',
   textAlign: 'center'
})

export const StyledBtnCreate = styled(Button)({
   padding: 2,
   minWidth: 40,
   minHeight: 40,
   borderRadius: '50%',
   textAlign: 'center',
   position: 'absolute',
   top: 10,
   right: 10,
   backgroundColor: colors.green,
   transition: 'transform 0.3s',

   "&:hover": {
      transform: 'scale(1.4)',
      backgroundColor: colors.green,
   }
})
