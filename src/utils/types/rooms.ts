export interface ICreateChatRoom {
  chatroom_name: string;
  chatroom_participants: string[];
  chatroom_pic_url?: string;
  created_by_user_id: string;
  last_message?: any;
}

export interface IChatRoom extends ICreateChatRoom { 
  _id: string
}

export interface ILastMessage {
  message_id: string;
  timestamp: number;
}
