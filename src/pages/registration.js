

import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Banner from '../sections/banner';
import Register from '../sections/account/register';



export default function RegPage() {
  return (

       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud R" />

          <Register />

        </Layout>
    </ThemeProvider>
  );
}
