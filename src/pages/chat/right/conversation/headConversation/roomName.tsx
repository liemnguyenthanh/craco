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
      <StyledWrap>
         {isEdit ?
            <TextField
               size='small'
               inputRef={inputRef}
               onBlur={handleBlur}
               defaultValue={roomName}
               onKeyDown={pressEnter}
            /> :
            <StyledRoomName variant='h5'>{roomName}</StyledRoomName>}
         <StyledButtonEdit size='small' onClick={handleClick}>
            <StyledIconButtonEdit />
         </StyledButtonEdit>
      </StyledWrap>
   )
}

const StyledWrap = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 10
})

const StyledRoomName = styled(Typography)({
   maxWidth: 240,
   textOverflow: 'ellipsis',
   overflow: 'hidden',
   whiteSpace: 'nowrap'
})

const StyledButtonEdit = styled(Button)({
   minWidth: 30,
})

const StyledIconButtonEdit = styled(ModeEditOutlineIcon)({
   fontSize: 16
})

