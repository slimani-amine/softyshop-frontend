import { createSlice } from '@reduxjs/toolkit';

export interface initialStateType {
  role: string;
}
const initialState = { role: 'customer' };
const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export default roleSlice.reducer;
export const { setRole } = roleSlice.actions;
