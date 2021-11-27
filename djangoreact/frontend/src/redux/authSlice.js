import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    password: '',
    nickname: '',
    token: '',
  },
  reducers: {
    login: (state, action) => {
      const newState = state;
      newState.email = action.payload.email;
      newState.password = action.payload.password;
      newState.token = action.payload.token;
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
