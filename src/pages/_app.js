import 'react-multi-carousel/lib/styles.css';
import 'react-modal-video/css/modal-video.min.css';
import 'rc-drawer/assets/index.css';
import 'typeface-dm-sans';

import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";

import '../styles/styles.css'
import '../styles/globals.css'
import '../styles/bootstrap.css'
import '../styles/Home.module.css'

/*
export default function CustomApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
*/
function CustomApp({ Component, pageProps }) {

  
  return (
    <>
{/*
    <div className="container">  

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9SCR547G1J"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9SCR547G1J');
        `}
      </Script>

    </div>
  */}    
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
