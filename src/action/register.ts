import { createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "../utils/fetch";
import { Response } from "../types";
import { RegisterValues } from "../pages/Register";

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (data: RegisterValues) => {
    const res = await fetch({
      url: '/register',
      method: 'POST',
      data
    }) as Response;
    
    return res;
  }
);