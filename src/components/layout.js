
import React, { useState, useEffect } from "react"
import Sticky from 'react-stickynode';
import Header from './header/header';
import Footer from './footer/footer';

export default function Layout({ children }) {
  const [isSticky, setIsSticky] = useState(false);
  const [userIn, setUserIn] = useState()  

  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsSticky(true);
    } else if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsSticky(false);
    }
  };
  
  useEffect(() => {
    var item = localStorage.getItem('caret')
    //console.log('is carrot ' + item)
    chStatus(item)
  }, [])

  async function chStatus(data){
    //console.log('log status ' + data)
    if(data === null){
      setUserIn(0)
    }else{
      setUserIn(1)
    }
    //console.log('user status ' + userIn)
  }


  return (
    <React.Fragment>
      <Sticky innerZ={1001} top={0} onStateChange={handleStateChange}>
        <Header className={`${isSticky ? 'sticky' : 'unSticky'}`} />
      </Sticky>
      <main id="content" sx={{ variant: 'layout.main', }} >
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
}
