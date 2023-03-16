import { IKeyObject } from "./common";
import { IMessage, IGroupMessageByType } from "./messages";
import { IRoom } from "./rooms";

export interface IChatInitial {
  roomList: IRoom[],
  roomInfo: IRoom | null,
  notFoundRoom: boolean,
  isLoadingRoom: boolean,
  roomInfoList: IKeyObject<IRoom>,
  messagesList: IMessage[],
  isLoadingMessageRoom: boolean,
  isLoadMoreMessageRoom: boolean,
  messagesInRooms: IKeyObject<IMessagesInRoom>,
}

export interface IMessagesInRoom {
   list: IGroupMessageByType[],
   firstMessage: IMessage,
   shouldLoadMore: boolean
}