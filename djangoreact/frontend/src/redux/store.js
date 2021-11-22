import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from './authSlice';

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
