import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    getUserDataSuccess(state, action) {
      state.data = action.payload;
      state.error = null;
    },
    getUserDataFailiure(state, action) {
      state.error = action.payload;
    },
    logOut(state, action) {
      state.data = null;
      state.error = null;
    },
  },
});

export const { getUserDataSuccess, getUserDataFailiure, logOut } =
  userSlice.actions;
export default userSlice.reducer;
