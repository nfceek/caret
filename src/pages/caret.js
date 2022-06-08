import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import CaretCard from '../components/caret-card';


export default function IndexPage() {
  return (

       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud Caret Patch" />

          <CaretCard />

        </Layout>
    </ThemeProvider>
  );
}
