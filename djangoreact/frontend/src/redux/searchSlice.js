import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    printed: [],
    remaining: [],
    pillList: [],
  },
  reducers: {
    initialList: (state) => {
      state = {
        printed: [],
        remaining: [],
        pillList: [],
      };
      return state;
    },
    printing: (state, action) => {
      const { printed, remaining, pillList } = action.payload;
      state = { printed, remaining, pillList };
      return state;
    },
  },
});

export const { initialList, printing } = searchSlice.actions;
