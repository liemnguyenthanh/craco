import { TYPE_MESSAGE } from "@/constants/chats";
import { UserAccount } from "./accounts";

export enum EMessageStatus {
   SENDING = 'SENDING',
   SENT = 'SENT',
   RECEIVE = 'RECEIVE',
   ERROR = 'ERROR',
}

export type TMessageStatus = keyof typeof EMessageStatus

export interface ICreateMessage {
   client_id: string
   sender_id: string
   room_id: string
   message_text: string
   message_type: TYPE_MESSAGE
   attachments?: IAttachment[]
   message_status: TMessageStatus
   timestamp: number
}

export interface IReceiverMessage extends ICreateMessage {
   _id: string
}
export interface IMessage extends ICreateMessage {
   _id?: string
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

export interface IAttachmentMessage {
   client_id: string
   url: string,
   file: any
}

export interface IAttachment {
   attachment_id: string
   thumbnail: string
}