import { IKeyObject } from "./common";
import { IMessage, IGroupMessageByType } from "./messages";
import { IRoom } from "./rooms";

export interface IChatInitial {
   roomList: string[],
   roomInfo: IRoom | null,
   roomIdActive: string,
   roomsCommon: IKeyObject<IRoom>,
   notFoundRoom: boolean,
   isLoadingRoom: boolean,
   messagesList: IMessage[],
   isLoadingMessageRoom: boolean,
   isLoadMoreMessageRoom: boolean,
   messagesInRooms: IKeyObject<IMessagesInRoom>,
   newMessageNoRoom: IMessage | null,
   newMessage: IMessage | null,
   idRoomCreated: string | null
}

export interface IMessagesInRoom {
   list: IGroupMessageByType[],
   firstMessage: IMessage,
   shouldLoadMore: boolean
}