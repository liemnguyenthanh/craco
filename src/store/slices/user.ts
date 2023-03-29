import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axiosRequest } from '@/services'
import { UserAccount } from '@/utils/types/accounts'
import { UserSlice } from '@/utils/types/users'

const initialState: UserSlice = {
   isFetchingUsers: false,
   usersByName: [],
}

export const chatSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      builder.addCase(fetchUsersByName.pending, (state) => {
         state.isFetchingUsers = true
      })
      builder.addCase(fetchUsersByName.fulfilled, (state, action: PayloadAction<UserAccount[]>) => {
         state.isFetchingUsers = false
         state.usersByName = action.payload
      })
   },
})

export const { } = chatSlice.actions

export const fetchUsersByName = createAsyncThunk(
   'users/list',
   async (name: string, { rejectWithValue }) => {
      try {
         const response = await axiosRequest("/users?username=" + name,)
         return response
      } catch (error) {
         console.log({ error });
         return rejectWithValue(error);
      }
   }
)

export default chatSlice.reducer
