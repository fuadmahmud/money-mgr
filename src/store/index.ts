import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "../reducers/auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import expanses from "../reducers/expanses";

export const store = configureStore({
  reducer: combineReducers({
    auth,
    expanses
  })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
