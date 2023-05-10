
import { RootState } from '@/store'
import { IRoom } from '@/utils/types/rooms'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import DragUploadZone from './dragUploadZone'
import MessagesList from './messages'

interface Props {
   room: IRoom
}

const MessagesAllRooms = ({ room }: Props) => {
   const { messagesInRooms } = useSelector((state: RootState) => state.chat)
   const roomId = room._id

   return (
      messagesInRooms[roomId] ?
         <DragUploadZone>
            <MessagesList key={roomId} messagesInRoom={messagesInRooms[roomId]} roomInfo={room} />
         </DragUploadZone>
         :
         <Fragment />
   )
}

export default MessagesAllRooms
