import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./slices/app";
import socketReducer from "./slices/socket";
import accountReducer from "./slices/account";
import chatReducer from "./slices/chat";

export const rootReducer = combineReducers({
  app: appReducer,
  account: accountReducer,
  chat: chatReducer,
  socket: socketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
