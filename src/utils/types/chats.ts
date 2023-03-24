import { IKeyObject } from "./common";
import { IMessage, IGroupMessageByType } from "./messages";
import { IRoom } from "./rooms";

export interface IChatInitial {
   roomList: IRoom[],
   roomInfo: IRoom | null,
   roomIdActive: string,
   notFoundRoom: boolean,
   isLoadingRoom: boolean,
   roomInfoList: IKeyObject<IRoom>,
   messagesList: IMessage[],
   isLoadingMessageRoom: boolean,
   isLoadMoreMessageRoom: boolean,
   messagesInRooms: IKeyObject<IMessagesInRoom>,
   newMessageNoRoom: IMessage | null,
}

export interface IMessagesInRoom {
   list: IGroupMessageByType[],
   firstMessage: IMessage,
   shouldLoadMore: boolean
}