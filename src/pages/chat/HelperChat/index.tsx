import { MESSAGE_ROOM_INFO } from '@/constants/chats'
import { RootState, useAppDispatch } from '@/store'
import { clearNewMessageNoRoom, fetchRoomNotExist, setIdRoomCreated } from '@/store/slices/chat'
import { getCurrentUser } from '@/utils/helpers'
import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'

const userInfo = getCurrentUser()

const HelperChat = () => {
   const dispatch = useAppDispatch()
   const { newMessageNoRoom } = useSelector((state: RootState) => state.chat)

   useEffect(() => {
      if (newMessageNoRoom && userInfo) {
         dispatch(fetchRoomNotExist({ room_id: newMessageNoRoom.room_id, user_id: userInfo._id }))
            .then((res) => {
               // new message is create room and create by current user -> navigator 
               if (res.payload.created_by_user_id === userInfo._id &&
                  newMessageNoRoom.message_type === MESSAGE_ROOM_INFO.CREATE_ROOM) {
                     dispatch(setIdRoomCreated(newMessageNoRoom.room_id))
                  }
            })
         dispatch(clearNewMessageNoRoom())
      }
      // eslint-disable-next-line
   }, [newMessageNoRoom])

   return <Fragment />   
}

export default HelperChat
