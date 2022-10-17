import { useQuery } from "react-query"
import getRoomList from "../service/getRoomList"

export const useGetRoomListQuery = () => 
    useQuery(['getRooms'],getRoomList);
