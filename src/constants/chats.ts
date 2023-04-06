// export enum TYPE_MESSAGE {
//    CLIENT = 1,
//    ADMIN = 2,
// }
export enum MESSAGE_ROOM_INFO {
   CHANGE_ROOM_NAME = 'CHANGE_ROOM_NAME',
   CHANGE_NICK_NAME = 'CHANGE_NICK_NAME',
   CREATE_ROOM = 'CREATE_ROOM',
} 

export enum MESSAGE_USER {
   MESSAGE_TEXT = 'MESSAGE_TEXT',
}

export type TYPE_MESSAGE = keyof typeof MESSAGE_ROOM_INFO | keyof typeof MESSAGE_USER

export const LIMIT_MESSAGE = 30