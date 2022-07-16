
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import Logout from '../sections/logout';


export default function IndexPage() {
  return (
       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud Logout" />
          <Logout />
        </Layout>
    </ThemeProvider>
  );
}
