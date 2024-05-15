import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "../utils/fetch";
import { LoginValues } from "../pages/Login";
import { Response } from "../types";

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginValues) => {
    const res = await fetch({
      url: '/auth',
      method: 'POST',
      data
    }) as Response;
    
    return res;
  }
);

export const logout = createAction(
  'auth/logout',
  () => ({
    payload: true
  })
)
