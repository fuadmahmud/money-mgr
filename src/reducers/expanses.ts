import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories, fetchExpanses } from '../action/expanses';

export interface Expanses {
  expanses?: Array<{
    date: string;
    amount: number;
    note: string;
    category: string;
  }>
  categories?: Array<{value: string; label: string;}>
}

const internalInitialState: Expanses = {
  expanses: [],
  categories: []
};

export const slice = createSlice({
  name: 'expanses',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpanses.fulfilled, (state, action) => {
      state.expanses = action.payload.data?.expanses as [];
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data?.categories as [];
    })
  }
});

export const { reset } = slice.actions;
export default slice.reducer;