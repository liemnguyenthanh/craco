export interface SocketInitial {
  isConnected: boolean,
  usersOnline: UserOnline[] | null,
}

export interface UserOnline {
  username: string,
  socketId: string
}

export interface Notification {
  title: string,
  description?: string
}