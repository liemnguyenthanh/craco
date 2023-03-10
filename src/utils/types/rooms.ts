export interface ICreateRoom {
  chatroom_name: string;
  chatroom_participants: string[];
  chatroom_pic_url?: string;
  created_by_user_id: string;
  last_message?: any;
}

export interface IRoom extends ICreateRoom { 
  _id: string,
  unread_count: number
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