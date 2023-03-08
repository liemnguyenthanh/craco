import { IKeyObject } from "./common";
import { IMessage, IGroupMessageByType } from "./messages";
import { IChatRoom } from "./rooms";

export interface IChatInitial {
  roomList: IChatRoom[],
  roomInfo: any,
  messagesList: IMessage[],
  messagesInRooms: IKeyObject<IGroupMessageByType[]> | null,
}

export interface IRoom {
  chatroom_name: string, 
  chatroom_participants: string[], 
  created_by_user_id: string
}