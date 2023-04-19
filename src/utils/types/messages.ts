import { TYPE_MESSAGE } from "@/constants/chats";
import { UserAccount } from "./accounts";
export interface ICreateMessage {
   sender_id: string;
   room_id: string;
   message_text: string;
   message_type: TYPE_MESSAGE;
   timestamp: number;
}
export interface IMessage extends ICreateMessage {
   _id: string;
}

export interface ISenderInRoom extends UserAccount {
   nickname?: string
}

export interface IGroupMessageByUser {
   key: string | null,
   sender_id: string,
   isMe: boolean,
   messages: IMessage[]
}

export interface IGroupMessageByType {
   key: string | null,
   type: TYPE_MESSAGE,
   action?: IMessage,
   messages_user?: IGroupMessageByUser,
}