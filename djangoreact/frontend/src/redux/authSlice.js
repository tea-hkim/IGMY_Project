import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    email: '',
    password: '',
  },
  reducers: {
    login: (state, action) => {
      const newState = state;
      newState.email = action.payload.email;
      newState.password = action.payload.password;
      state = newState;
    },
  },
});

export const { login } = loginSlice.actions;
