

import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import Login from '../sections/login';


export default function IndexPage() {
  return (

       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud Login" />

          <Login />

        </Layout>
    </ThemeProvider>
  );
}
