import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDrawerShown: false };

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    showDrawer(state) {
      state.isDrawerShown = true;
    },
    hideDrawer(state) {
      state.isDrawerShown = false;
    },
  },
});

export default drawerSlice.reducer;
export const { showDrawer, hideDrawer } = drawerSlice.actions;
