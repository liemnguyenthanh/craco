import { RootState, useAppDispatch } from '@/store'
import { clearNewMessageNoRoom, fetchRoomNotExist } from '@/store/slices/chat'
import { getMyAccount } from '@/utils/helpers'
import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'

const HelperChat = () => {
  const dispatch = useAppDispatch()
  const { newMessageNoRoom } = useSelector((state: RootState) => state.chat)
  const userInfo = getMyAccount()

  useEffect(() => {
    if (newMessageNoRoom && userInfo) {
      dispatch(fetchRoomNotExist({ room_id: newMessageNoRoom.room_id, user_id: userInfo._id }))
      dispatch(clearNewMessageNoRoom())
    }
  }, [newMessageNoRoom, userInfo])

  
  return <Fragment />
}

export default HelperChat
