import { createSlice } from '@reduxjs/toolkit'

const AppInitial = {
   isOpenSwipeRoomInfo: false,
   isOpenRoomList: false,
}

export const appSlice = createSlice({
   name: 'app',
   initialState: AppInitial,
   reducers: {
      setIsOpenSwipeRoomInfo(state) {
         state.isOpenSwipeRoomInfo = !state.isOpenSwipeRoomInfo
      },
      setIsOpenRoomList(state) {
         state.isOpenRoomList = !state.isOpenRoomList
      },
   },
})

export const { setIsOpenSwipeRoomInfo, setIsOpenRoomList } = appSlice.actions

export default appSlice.reducer
