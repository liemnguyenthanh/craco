import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./slices/app";
import socketReducer from "./slices/socket";
import accountReducer from "./slices/account";
import chatReducer from "./slices/chat";
import userReducer from "./slices/users";

export const rootReducer = combineReducers({
  app: appReducer,
  account: accountReducer,
  chat: chatReducer,
  socket: socketReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
