const API_URL = {
   'local': {
      URL_SOCKET: 'ws://localhost:8080/',
      URL: 'http://localhost:8080'
   },
   'production': {
      URL_SOCKET: 'wss://chat-app-ya2e.onrender.com/',
      URL: 'https://chat-app-ya2e.onrender.com'
   },
}

export const { URL, URL_SOCKET } = API_URL.local