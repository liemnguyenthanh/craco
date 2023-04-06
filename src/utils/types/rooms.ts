import { UserAccount } from "./accounts";

export interface ICreateRoom {
   chatroom_name: string;
   chatroom_participants: string[];
   chatroom_pic_url?: string;
   created_by_user_id: string;
   last_message?: any;
   is_group: boolean
}

export interface IRoom extends Omit<ICreateRoom, 'chatroom_participants'> {
   _id: string;
   chatroom_participants: UserAccount[];
   unread_count: number;
   nickname: {
      [user_id: string]: string
   }
}

export interface ILastMessage {
   message_id: string;
   timestamp: number;
}

export interface IRoomMessageStatus {
   room_id: string,
   user_id: string,
   count: number,
}

export interface IUpdateRoom {
   chatroom_participants?: UserAccount[];
   chatroom_name?: string;
   chatroom_pic_url?: string;
   nickname?: {
      [user_id: string]: string
   }
}