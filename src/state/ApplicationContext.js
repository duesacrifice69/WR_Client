import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuItems: [],
};

export const applicationSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menuItems = action.payload;
    },
  },
});

export const { setMenu } = applicationSlice.actions;

export default applicationSlice.reducer;
