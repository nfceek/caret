
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Social from '../templates/social';

export default function SocialPage() {
  return (
       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud Social" />
          <Social />
        </Layout>
    </ThemeProvider>
  );
}