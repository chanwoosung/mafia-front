import { client } from "./client";

export default async function postCancelReady({params}) {
    const {data: {data}} = await client.post('/cancel-ready',{
        params
    });
    return data;
}