import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { id: '', token: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action) {
      if (!action.payload) return;
      console.log('🚀 ~ saveUser ~ action:', action.payload);
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { saveUser } = userSlice.actions;
