import { createSlice } from '@reduxjs/toolkit';
import { userType } from './dataTypes';

const initialState: userType = {
  role: '',
  cart: { id: 0 },
  confirmation_token: null,
  confirmed_email: true,
  email: '',
  firstName: '',
  lastName: '',
  id: '',
  isVerified: false,
  phoneNumber: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action) {
      state = action.payload;
      console.log(state);
    },
  },
});

export default userSlice.reducer;
export const { saveUser } = userSlice.actions;
