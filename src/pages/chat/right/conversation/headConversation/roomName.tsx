import { useAppDispatch } from '@/store';
import { updateRoomInfo } from '@/store/slices/chat';
import styled from '@emotion/styled';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
   roomName: string
}

export const RoomName = ({ roomName }: Props) => {
   const [isEdit, setIsEdit] = useState(false)
   const inputRef = useRef<HTMLInputElement>(null)
   const dispatch = useAppDispatch()

   const handleClick = () => {
      setIsEdit(pre => !pre)
      setTimeout(() => {
         inputRef.current?.focus()
      }, 0);
   }

   const handleBlur = () => setIsEdit(false)

   const pressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
         const value = inputRef.current?.value.trim()
         if (value) {
            dispatch(updateRoomInfo({ chatroom_name: value }))
            handleBlur()
         } else toast("Nhập tên phòng đi khứa!!")
      }
   }

   return (
      <Wrap>
         {isEdit ?
            <TextField
               size='small'
               inputRef={inputRef}
               onBlur={handleBlur}
               defaultValue={roomName}
               onKeyDown={pressEnter}
            /> :
            <Typography variant='h5'>{roomName}</Typography>}
         <ButtonEdit size='small' onClick={handleClick}>
            <IconButtonEdit />
         </ButtonEdit>
      </Wrap>
   )
}

const Wrap = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 10
})

const ButtonEdit = styled(Button)({
   minWidth: 30,
})

const IconButtonEdit = styled(ModeEditOutlineIcon)({
   fontSize: 16
})

