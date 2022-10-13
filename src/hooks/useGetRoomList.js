import getRoomList from "../service/getRoomList"

export const useGetRoomList = () => {
    return async() => {
        return await getRoomList();
    }
}