const SocketEmitConst = {
  // Common Socket emits
  ERROR_RESPONSE: 'errorResponse',
  ERROR: 'error',
  AUTH_ERROR: 'autherror',
  CONNECT_ERROR: 'connect_error',
  CONNECT_TIMEOUT: 'connect_timeout',
  DISCONNECT: 'disconnect',
  RECONNECT: 'reconnect',
  CONNECT: 'connect',

  // Server Emits
  ORDER_ACCEPTED: 'orderaccepted',

  // App Emits
  JOIN_ROOM: 'joinRoom'
};

export default SocketEmitConst;
