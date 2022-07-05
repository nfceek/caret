
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import PurchaseFailed from '../sections/purchase-failed';

const data = {
    subTitle: '',
    title: 'Order Complete',
    features: [],
}
export default function purchasePage() {
  return (
       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Caret.Cloud Purchase Complete" />
          <PurchaseFailed />
        </Layout>
    </ThemeProvider>
  );
}