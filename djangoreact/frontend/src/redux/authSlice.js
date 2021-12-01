import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    username: '',
    token: '',
    logged: false,
  },
  reducers: {
    initializeInput: (state) => {
      state = {
        email: '',
        username: '',
        access: '',
        logged: false,
      };
      return state;
    },
    login: (state, action) => {
      const { username, access } = action.payload;
      state = { username, access };
      state.logged = true;
      return state;
    },
    register: (state, action) => {
      const { email, username } = action.payload;
      state = { email, username };
      return state;
    },
  },
});

export const { login, register, initializeInput } = authSlice.actions;
