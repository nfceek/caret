import React from 'react';
import Head from 'next/head';
import Script from "next/script";

export default function SEO({
  description = 'Crypto Wallet Address Shortener service. Get human readable word conversion for wallet address',
  author = 'RBS',
  meta = 'crypto, wallet, address, shortener, reducer',
  title = 'Caret Cloud - Crypto Address Reducer',
  }) {
  const metaData = [
    {
      name: `description`,
      content: description,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: description,
    },
  ].concat(meta);
  
  return (
    <Head>
      <title>{title}</title>
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
      {/*}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-9SCR547G1J" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-9SCR547G1J');`}
      </Script>
      */}
    </Head>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
};
