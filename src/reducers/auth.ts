import { login, logout } from '../action/auth';
import { createSlice } from '@reduxjs/toolkit';

export interface IAuth {
  username: string;
}

const internalInitialState: IAuth = {
  username: ""
};

export const slice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('username', action.payload.data?.username as string);      
      state.username = action.payload?.data?.username as string;
    });
    builder.addCase(logout, (state) => {
      localStorage.removeItem('username');
      state.username = "";
    });
  }
});

export const { reset } = slice.actions;
export default slice.reducer;