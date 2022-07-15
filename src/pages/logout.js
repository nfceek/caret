import React from 'react';

import { useRouter } from 'next/router'

export default function IndexPage() {
    const router = useRouter()

    localStorage.removeItem('caret');
    //setUserIn(0)  
    //localStorage.removeItem('wallet');
    router.push('/');
    
  return (

       <div >Logout</div>

  );
}