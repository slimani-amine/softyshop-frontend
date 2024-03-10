import { createSlice } from '@reduxjs/toolkit';

export interface initialStateType {
  role: string | null | undefined;
}

const initialState = { role: 'user' };
const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload || 'user';
    },
  },
});

export default roleSlice.reducer;
export const { setRole } = roleSlice.actions;
