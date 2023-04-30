import { createSlice } from '@reduxjs/toolkit'

const AppInitial = {
   isOpenSwipeRoomInfo: false
}

export const appSlice = createSlice({
   name: 'app',
   initialState: AppInitial,
   reducers: {
      setIsOpenSwipeRoomInfo(state) {
         state.isOpenSwipeRoomInfo = !state.isOpenSwipeRoomInfo
      }
   },
})

export const { setIsOpenSwipeRoomInfo } = appSlice.actions

export default appSlice.reducer
