import { HomeState } from '@/redux/interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const homeState: HomeState = {
  userInfo: null,
  token: null
}

const homeSlice = createSlice({
  name: 'home',
  initialState: homeState,
  reducers: {
    // 设置用户信息
    setUserInfo: (state: HomeState, { payload }: PayloadAction<object>) => {
      state.userInfo = payload
    },
    setToken: (state: HomeState, { payload }: PayloadAction<string>) => {
      state.token = payload
    }
  }
})

export const { setUserInfo, setToken } = homeSlice.actions

export default homeSlice.reducer
