

import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import Banner from '../sections/banner';
import SectionLower from '../sections/dashboard-section-lower';
import SectionUpper from '../sections/dashboard-section-upper';

export default function IndexPage() {
  return (
       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud User Dashboard" />
          <SectionUpper />
          <SectionLower />
        </Layout>
    </ThemeProvider>
  );
}
