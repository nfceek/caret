

import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import Dashboard from '../sections/dashboard';

export default function IndexPage() {
  return (
       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud R" />
          <Dashboard />
        </Layout>
    </ThemeProvider>
  );
}
