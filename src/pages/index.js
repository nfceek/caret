

import React from 'react';
import { ThemeProvider } from 'theme-ui';
import Theme from '../theme';

import SEO from 'components/seo';
import Layout from 'components/layout';
import Banner from '../sections/banner';
import KeyFeature from '../sections/key-feature';
import ServiceSection from '../sections/service-section';
import Feature from '../sections/feature';
import CoreFeature from '../sections/core-feature';
import WorkFlow from '../sections/workflow';
import Package from '../sections/package';
import TeamSection from '../sections/team-section';
import Signup from '../sections/signup';
import CaretFeature from '../sections/caret-feature';


export default function IndexPage() {
  return (

       <ThemeProvider theme={Theme} >
        <Layout>
          <SEO title="Welcome to Caret.Cloud" />
          <Banner />
          <KeyFeature />
          <ServiceSection />
          <Feature />
          <CoreFeature />
          <WorkFlow />
          <Package />
          <Signup />
          <CaretFeature />
          <TeamSection />
        </Layout>
    </ThemeProvider>
  );
}
