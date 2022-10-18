export const SOCKET_EVENT = {
    JOIN_ROOM: 'JOIN_ROOM',
    UPDATE_NICKNAME: "UPDATE_NICKNAME",
    SEND_MESSAGE: "SEND_MESSAGE",
    RECEIVE_MESSAGE: "RECEIVE_MESSAGE",
    QUIT_ROOM: "QUIT_ROOM",
    GET_READY: "GET_READY",
    CANCEL_READY: "CANCEL_READY",
    ALL_READY: "ALL_READY",
    GAME_START: "GAME_START",
}

export const ROUTE_PATH = {
    HOME: '/',
    LOGIN: '/login',
    LOBBY: '/lobby',
    ROOM: '/room/:roomId',
}

export const API_PATH = {
    LOGIN: '/confirm',
}