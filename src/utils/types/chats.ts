import { IMessage } from "./messages";

export interface IChatInitial {
  roomList: any,
  roomInfo: any,
  messagesList: IMessage[],
}