
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'

export default function Logout() {
    const router = useRouter()

    useEffect(() => {
        var item = localStorage.getItem('caret')
        //console.log(item)
        chStatus(item)
      }, [])

    function chStatus(data){
        if(data !== undefined || data !== ''){
            if(localStorage === window.localStorage){
                localStorage.removeItem('caret');
                //setUserIn(0)  
                //localStorage.removeItem('wallet');
                router.push('/');
            }
        }
    }

  return (

       <div >Logout</div>

  );
}

