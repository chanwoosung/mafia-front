import { client } from "./client";

export default async function postGetReady({params}) {
    const {data: {data}} = await client.post('/get-ready',{
        params
    });
    return data;
}