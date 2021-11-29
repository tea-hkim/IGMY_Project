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
    initializeInput: (state) => {
      state = {
        email: '',
        password: '',
        nickname: '',
        token: '',
      };
      return state;
    },
    login: (state, action) => {
      const { email, password, token } = action.payload;
      state = { email, password, token };
    },
    register: (state, action) => {
      const { email, password, nickname } = action.payload;
      state = { email, password, nickname };
    },
  },
});

export const { login, register } = authSlice.actions;
