export const EVENTS_SOCKET = {
  //connect
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',


  //room
  JOIN_DASHBOARD: 'JOIN_DASHBOARD',
  JOIN_ROOM: 'JOIN_ROOM',
  OUT_ROOM: 'OUT_ROOM',
  CHANGE_ROOM_NAME: 'CHANGE_ROOM_NAME',
  CHANGED_ROOM_NAME: 'CHANGED_ROOM_NAME',


  //message
  SEND_MESSAGE: 'SEND_MESSAGE',
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',

  //notification
  NOTIFICATION_USER_ONLINE: 'NOTIFICATION_USER_ONLINE',
  NOTIFICATION_USER_OFFLINE: 'NOTIFICATION_USER_OFFLINE',
  USERS_ONLINE: 'USERS_ONLINE',
};

export const SPECIAL_MESSAGE = {
  CHANGED_NAME_ROOM: 'CHANGED_NAME_ROOM',
}

export const getSpecialMessage = (text: string) => {
  const arrStr = text.split(" ")
  const event = arrStr[0]
  let content = ''

  if (arrStr.length > 1) arrStr.splice(0, 1)
  content = arrStr.join(" ")
  return { event, content }
}