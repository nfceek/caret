
import React, { useState, useEffect } from "react"
import Sticky from 'react-stickynode';
import Header from './inner/header';
import Footer from './footer/footer';

export default function Layout({ children }) {
  const [isSticky, setIsSticky] = useState(false);

  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsSticky(true);
    } else if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsSticky(false);
    }
  };
  
  useEffect(() => {
    var item = localStorage.getItem('caret')
    //console.log(item)
    chStatus(item)
  }, [])

  var userIn = ''
  function chStatus(data){
    /*
    console.log('log status ' + data)

    if(data !== 0){
      userIn = 'logged in'
    }else{
      userIn = 'not logged'
      //router.push('/');
    }
    */
  }

  return (
    <React.Fragment>
        <Header className='userIn' />
        <main id="content" sx={{ variant: 'layout.main', }} >
          {children}
        </main>
      <Footer />
    </React.Fragment>
  );
}
