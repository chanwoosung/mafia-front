import { client } from "./client";

export default async function getRoomList() {
    const {data: {data}} = await client.get('/get-rooms');
    return data;
}