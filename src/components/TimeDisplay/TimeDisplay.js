import { useEffect, useState } from 'react';
import { addZero } from '../../utils/utils';

export default function TimeDisplay(){
    const [serverTime,setServerTime] = useState(new Date().getTime());
    let timeInterval;

    useEffect(()=>{
        timeInterval = setTimeout(()=>setServerTime(new Date().getTime()),500);
      },[]);
  
      
    useEffect(()=>{
        timeInterval = setTimeout(()=>setServerTime(new Date().getTime()),500)
        return () => {clearTimeout(timeInterval);}
    },[serverTime]);
    
    function getTimeDisplay() {
        let	curTime = new Date(serverTime);
        const year = curTime.getFullYear();
        const month = addZero(curTime.getMonth() + 1);
        const day = addZero(curTime.getDate());
        const hours = addZero(curTime.getHours());
        const minutes = addZero(curTime.getMinutes());
        const seconds = addZero(curTime.getSeconds());

        return day + "/" + month + "/" + year + "  " + (hours) + ":" + (minutes) + ":" + (seconds);
    }

    return (
        <div style={{padding:10}}>
            {getTimeDisplay()}
        </div>
    )
}