

import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import Register from '../sections/register';


export default function RegPage() {
  return (
       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud Registration" />
          <Register />
        </Layout>
    </ThemeProvider>
  );
}
