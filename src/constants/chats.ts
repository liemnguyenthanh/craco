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

export const HEIGHT_CHAT = 'calc(100dvh - 230px)'

export const HEIGHT_MAIN = 'calc(100dvh - 60px)'
