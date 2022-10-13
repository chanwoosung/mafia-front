import { API_PATH } from "../constant/constant";
import { client } from "./client";

export default async function getConfirmLogin({ip,nickname}) {
    const {data} = await client.get(API_PATH.LOGIN,{
        params: {
            ip,
            nickname
        }
    });
    return data
}