
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import { Privacy } from '../templates/privacy';


export default function PrivPage() {
  return (
       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud Privacy" />
          <Privacy />
        </Layout>
    </ThemeProvider>
  );
}