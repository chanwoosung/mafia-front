import { client } from "./client";

export default async function getRoomList() {
    const {data} = await client.get('/make-room');
    return data;
}