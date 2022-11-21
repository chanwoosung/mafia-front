
export function Timer({time,callback}) {
    let min =0 ;
    let sec =0;
    const interval = setInterval(()=> {
        min = time%60;
        sec = min%60;
        if( min === 0 && sec === 0 ) {
            callback();
            clearInterval(interval);
        }
    },1000);

    return (
        <div>
            {min} : {sec}
        </div>
    )
}

export function setTimer(callback) {
    return <Timer time={120000} callback={callback} />
}