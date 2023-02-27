import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./slices/app";
import socketReducer from "./slices/socket";
import accountReducer from "./slices/account";

export const rootReducer = combineReducers({
  app: appReducer,
  account: accountReducer,
  socket: socketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
