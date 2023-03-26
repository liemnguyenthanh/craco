
import { RootState } from '@/store'
import { IRoom } from '@/utils/types/rooms'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import MessagesList from './messages'
interface Props {
   roomId: string,
   room: IRoom
}

const MessagesAllRooms = ({ roomId, room }: Props) => {
   const { messagesInRooms } = useSelector((state: RootState) => state.chat)
  
   return (
      messagesInRooms[roomId] ?
         <MessagesList key={roomId} messagesInRoom={messagesInRooms[roomId]} roomInfo={room} /> :
         <Fragment />
   )
}

export default MessagesAllRooms
