
import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layoutInner';
import PurchaseComplete from '../sections/purchase-complete';

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
          <PurchaseComplete />
        </Layout>
    </ThemeProvider>
  );
}