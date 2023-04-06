import { UserAccount } from "./accounts";

export type TMessageType = 1 | 2 | 3

export interface IMessage {
  _id?: string;
  sender_id: string;
  room_id: string;
  message_text: string;
  message_type: TMessageType;
  timestamp: number;
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
  type: TMessageType,
  action?: IMessage,
  messages_user?: IGroupMessageByUser,
}
