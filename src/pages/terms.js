
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Terms from '../templates/terms';

export default function TermsPage() {
  return (
       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud Terms" />
          <Terms />
        </Layout>
    </ThemeProvider>
  );
}