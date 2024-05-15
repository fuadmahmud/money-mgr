import { createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "../utils/fetch";
import { Response } from "../types";
import { ExpenseValue } from "../pages/Expanse";

export const fetchExpanses = createAsyncThunk(
  'expanses/user',
  async ({ username }: { username: string }) => {
    const res = await fetch({
      url: `/expanses`,
      method: 'GET',
      params: { username }
    }) as Response;
    
    return res;
  }
);

export const fetchCategories = createAsyncThunk(
  'expanses/categories',
  async () => {
    const res = await fetch({
      url: `/categories`,
      method: 'GET'
    }) as Response;
    
    return res;
  }
);

export const postExpanses = createAsyncThunk(
  'expanses/save',
  async ({ username, data }: { username: string; data: ExpenseValue }) => {
    const res = await fetch({
      url: `/expanses`,
      method: 'POST',
      params: {username},
      data
    }) as Response;
    
    return res;
  }
);