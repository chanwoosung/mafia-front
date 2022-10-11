import { useEffect, useState } from "react";

export default function useRandomId() {
    const [ipID,setIpID] = useState();
    useEffect(()=>{
        const getRandomID = async() => {
            const ipData = await fetch('https://geolocation-db.com/json/');
            const locationIp = await ipData.json();
            setIpID( locationIp.country_code + "_" + locationIp.IPv4)
        }
        getRandomID()
    },[])
    return {ipID}
}