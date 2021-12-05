import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authSlice } from './authSlice';
import { searchSlice } from './searchSlice';

const reducer = combineReducers({
  auth: authSlice.reducer,
  searchList: searchSlice.reducer,
});

export default configureStore({
  reducer,
});
