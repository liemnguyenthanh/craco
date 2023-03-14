import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { axiosRequest } from '@/services';
import { AccountSlice, LoginRequest, UserAccount } from '@/utils/types/accounts';

const initialState: AccountSlice = {
  user: null,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserAccount>) => {
      state.user = action.payload
      window.localStorage.setItem('user', JSON.stringify(action.payload));
      window.location.reload()
    })
  },
})

export const loginUser = createAsyncThunk(
  'auth/login',
  async (request: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await axiosRequest("/auth/login", request)
      return response
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export default accountSlice.reducer
