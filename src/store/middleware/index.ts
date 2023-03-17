import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { URL_SOCKET } from "@/constants/api";
import { getItemLocalStorage, getMyAccount } from "@/utils/helpers";
import { showNotification } from "@/utils/notification";
import { IMessage } from "@/utils/types/messages";
import { UserOnline } from "@/utils/types/socket";
import { RootState } from "../rootReducers";
import { receiveNewMessage } from "../slices/chat";
import { addUsersOnline, removeUsersOnline, setUsersOnline } from "../slices/socket";
import { EVENTS_SOCKET } from "./events";
const user = getMyAccount()

export const socketMiddleware: Middleware<{}, RootState> = (store) => {
  let socket: Socket;

  return (next) => ({ type, payload }: AnyAction) => {

    if (type === "connect") {
      socket = io(URL_SOCKET);
      const user = getItemLocalStorage('user')

      socket.on(EVENTS_SOCKET.CONNECT, () => {
        socket.emit(EVENTS_SOCKET.JOIN_DASHBOARD, { id: user._id, username: user.username })
        store.dispatch({ type: 'socket/connected' });
      });

      socket.on(EVENTS_SOCKET.DISCONNECT, () => {
        store.dispatch({ type: 'socket/disconnected' });
      });

      socket.on(EVENTS_SOCKET.NOTIFICATION_USER_ONLINE, ({ username, socketId }) => {
        showNotification("Khứa này mới Online " + username)
        store.dispatch(addUsersOnline({ username, socketId }));
      });

      socket.on(EVENTS_SOCKET.USERS_ONLINE, (clientList) => {
        const index = clientList.findIndex((client: UserOnline) => client.socketId === socket.id);
        if (index > -1) {
          clientList.splice(index, 1);
        }
        store.dispatch(setUsersOnline(clientList));
      });

      socket.on(EVENTS_SOCKET.NOTIFICATION_USER_OFFLINE, (socketId: string) => {
        store.dispatch(removeUsersOnline({ socketId }));
      });

      socket.on(EVENTS_SOCKET.RECEIVE_MESSAGE, (new_message: IMessage) => {
        store.dispatch(receiveNewMessage(new_message));
      });
    }

    if (type === "disconnect") {
      if (socket) {
        socket.disconnect();
      }
    }

    if (type === EVENTS_SOCKET.SEND_MESSAGE) {
      socket.emit(EVENTS_SOCKET.SEND_MESSAGE, payload)
    }

    if (type === EVENTS_SOCKET.CHANGE_ROOM_NAME) {
      const roomId = store.getState().chat.roomIdActive;

      if (roomId && user) {
        const request = {
          room_id: roomId,
          sender_id: user._id,
          chatroom_name: payload
        }
        socket.emit(EVENTS_SOCKET.CHANGE_ROOM_NAME, request)
      }
    }
    return next({ type, payload });
  };
};