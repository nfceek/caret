
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import PurchaseChoice from '../sections/purchase-choice';

const data = {
    subTitle: 'Your Options',
    title: 'REGISTRATION',
    features: [],
}
export default function purchasePage() {
  return (
       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud Purchase" />
          <PurchaseChoice />
        </Layout>
    </ThemeProvider>
  );
}


