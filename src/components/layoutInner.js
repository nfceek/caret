
import React, { useState } from 'react';
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
  
  return (
    <React.Fragment>
        <Header/>
        <main id="content" sx={{ variant: 'layout.main', }} >
          {children}
        </main>
      <Footer />
    </React.Fragment>
  );
}
