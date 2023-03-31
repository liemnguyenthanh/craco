import { useAppDispatch } from "@/store"
import { updateRoomInfo } from "@/store/slices/chat"
import styled from "@emotion/styled"
import { Box } from "@mui/system"
import { useState } from "react"
import ItemNickname from "./item"

export interface IUserNickname {
   user_id: string
   username: string
   nickname?: string
}

interface Props {
   list: IUserNickname[]
}

const Nickname = ({ list }: Props) => {
   const [selectUser, setSelectUser] = useState<string>('')
   const dispatch = useAppDispatch()
   
   const handleChangeNickname = (user_id: string, nickname: string) => {
      dispatch(updateRoomInfo({ nickname: { [user_id]: nickname } }))
   }

   const handleSelectUser = (id: string) => setSelectUser(id)

   return (
      <StyledList>
         {list.map(user => <ItemNickname
            key={user.user_id}
            selectUser={selectUser}
            user={user}
            onSelectUser={handleSelectUser}
            handleChangeNickname={handleChangeNickname}
         />)}
      </StyledList>
   )
}

export default Nickname

export const StyledList = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   marginTop: 15,
   gap: 10
})

