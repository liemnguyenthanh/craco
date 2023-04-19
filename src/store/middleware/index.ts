import { URL_SOCKET } from "@/constants/api";
import { getCurrentUser } from "@/utils/helpers";
import { showNotification } from "@/utils/notification";
import { IMessage } from "@/utils/types/messages";
import { IRoomMessageStatus } from "@/utils/types/rooms";
import { UserOnline } from "@/utils/types/socket";
import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";
import { RootState } from "../rootReducers";
import { readMessage, receiveNewMessage } from "../slices/chat";
import { addUsersOnline, removeUsersOnline, setUsersOnline } from "../slices/socket";
import { EVENTS_SOCKET } from "./events";
const userInfo = getCurrentUser()

export const socketMiddleware: Middleware<{}, RootState> = (store) => {
   let socket: Socket;

   return (next) => ({ type, payload }: AnyAction) => {

      if (type === "connect") {
         socket = io(URL_SOCKET);

         socket.on(EVENTS_SOCKET.CONNECT, () => {
            socket.emit(EVENTS_SOCKET.JOIN_DASHBOARD, { id: userInfo._id, username: userInfo.username })
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
            if (index > -1) clientList.splice(index, 1)

            store.dispatch(setUsersOnline(clientList));
         });

         socket.on(EVENTS_SOCKET.NOTIFICATION_USER_OFFLINE, (socketId: string) => {
            store.dispatch(removeUsersOnline({ socketId }));
         });

         socket.on(EVENTS_SOCKET.RECEIVE_MESSAGE, (newMessage: IMessage) => {
            store.dispatch(receiveNewMessage(newMessage));
         });

         socket.on(EVENTS_SOCKET.READ_MESSAGE_SERVER, (statusMessage: IRoomMessageStatus) => {
            store.dispatch(readMessage(statusMessage));
         });
      }

      if (type === "disconnect") {
         if (socket) socket.disconnect()
      }

      if (type === EVENTS_SOCKET.SEND_MESSAGE) {
         socket.emit(type, payload)
      }

      if (type === EVENTS_SOCKET.READ_MESSAGE_CLIENT) {
         socket.emit(type, { ...payload, user_id: userInfo._id })
      }

      return next({ type, payload });
   };
};