/* eslint-disable react-hooks/exhaustive-deps */
import { RootState, useAppDispatch } from '@/store'
import { shouldReadMessageInRoom, updateReadMessageInRoom } from '@/store/slices/chat'
import { IRoom } from '@/utils/types/rooms'
import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MessagesList from './messages'
interface Props {
   roomId: string,
   room: IRoom
}
const MessagesAllRooms = ({ roomId, room }: Props) => {
   const { messagesInRooms } = useSelector((state: RootState) => state.chat)
   const shouldReadMessage = useSelector(shouldReadMessageInRoom(roomId))
   const dispatch = useAppDispatch()
   
   useEffect(() => {
      if (shouldReadMessage) {
         dispatch(updateReadMessageInRoom({ room_id: roomId, count: 0 }))
      }
   }, [roomId])
   
   return (
      messagesInRooms[roomId] ?
         <MessagesList messagesInRoom={messagesInRooms[roomId]} roomInfo={room} /> :
         <Fragment />
   )
}

export default MessagesAllRooms
