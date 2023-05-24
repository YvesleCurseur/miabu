import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const userCallback = {
  id: Cookies.get('id') || '',
  email: Cookies.get('email') || '',
  firstName: Cookies.get('firstName') || '',
  accessToken: Cookies.get('accessToken') || '',
  refreshToken: Cookies.get('refreshToken') || '',
}

const initialState = {
  id: 0,
  email: '',
  firstName: '',
  accessToken: '',
  refreshToken: '',
  ...userCallback
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUser(state) {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;