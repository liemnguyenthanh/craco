import { RootState, useAppDispatch } from '@/store'
import { clearNewMessageNoRoom, fetchRoomNotExist } from '@/store/slices/chat'
import { getCurrentUser } from '@/utils/helpers'
import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'

const HelperChat = () => {
   const dispatch = useAppDispatch()
   const { newMessageNoRoom } = useSelector((state: RootState) => state.chat)
   const userInfo = getCurrentUser()

   useEffect(() => {
      if (newMessageNoRoom && userInfo) {
         dispatch(fetchRoomNotExist({ room_id: newMessageNoRoom.room_id, user_id: userInfo._id }))
         dispatch(clearNewMessageNoRoom())
      }
   }, [dispatch, newMessageNoRoom, userInfo])

   return <Fragment />
}

export default HelperChat
