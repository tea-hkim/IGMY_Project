import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
    nickname: '',
  },
  reducers: {
    login: (state, action) => {
      const newState = state;
      newState.email = action.payload.email;
      newState.password = action.payload.password;
      state = newState;
    },
    register: (state, action) => {
      const newState = state;
      newState.email = action.payload.email;
      newState.password = action.payload.password;
      newState.nickname = action.payload.nickname;
      state = newState;
    },
  },
});

export const { login, register } = authSlice.actions;
