import { HomeState } from "@/redux/interface"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const homeState: HomeState = {
  userInfo: null
};

const homeSlice = createSlice({
  name: "home",
  initialState: homeState,
  reducers: {
    // 设置用户信息
    setUserInfo: (state: HomeState, { payload }: PayloadAction<object>) => {
      state.userInfo = payload;
    }
  }
})

export const { setUserInfo } = homeSlice.actions

export default homeSlice.reducer
