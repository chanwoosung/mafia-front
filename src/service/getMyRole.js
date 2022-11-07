import { API_PATH } from "../constant/constant";
import { client } from "./client";

export default async function getMyRole({ip,nickname,roomId}) {
    const {data} = await client.get(API_PATH.MY_ROLE,{
        params: {
            ip,
            nickname,
            roomId
        }
    });
    console.log(data)
    return data
}