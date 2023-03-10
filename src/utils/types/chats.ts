import { IKeyObject } from "./common";
import { IMessage, IGroupMessageByType } from "./messages";
import { IRoom } from "./rooms";

export interface IChatInitial {
  roomList: IRoom[],
  roomInfo: IRoom | null,
  messagesList: IMessage[],
  messagesInRooms: IKeyObject<IGroupMessageByType[]> | null,
}
