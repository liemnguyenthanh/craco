import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { getItemLocalStorage } from "../../utils/helpers";
import { UserOnline } from "../../utils/types/socket";
import { RootState } from "../rootReducers";
import { addUsersOnline, setNotification, setUsersOnline } from "../slices/socket";
import { EVENTS_SOCKET } from "./events";
const URL_SOCKET = 'ws://localhost:8080'

export const socketMiddleware: Middleware<{}, RootState> = (store) => {
  let socket: Socket;

  return (next) => ({ type, payload }: AnyAction) => {

    if (type === "connect") {
      socket = io(URL_SOCKET);
      const user = getItemLocalStorage('user')

      socket.on(EVENTS_SOCKET.CONNECT, () => {
        socket.emit(EVENTS_SOCKET.JOIN_DASHBOARD, user.username)
        store.dispatch({ type: 'socket/connected' });
      });

      socket.on(EVENTS_SOCKET.DISCONNECT, () => {
        store.dispatch({ type: 'socket/disconnected' });
      });

      socket.on(EVENTS_SOCKET.NOTIFICATION_USER_ONLINE, ({ username, socketId }) => {
        store.dispatch(setNotification({
          title: "Khứa này mới Online",
          description: username
        }));
        store.dispatch(addUsersOnline({ username, socketId }));
      });

      socket.on(EVENTS_SOCKET.USERS_ONLINE, (clientList) => {
        const index = clientList.findIndex((client: UserOnline) => client.socketId === socket.id);
        if (index > -1) {
          clientList.splice(index, 1);
        }
        store.dispatch(setUsersOnline(clientList));
      });
    }

    if (type === "disconnect") {
      if (socket) {
        socket.disconnect();
      }
    }

    return next({ type, payload });
  };
};