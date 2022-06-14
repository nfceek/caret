

import React from 'react';
import { ThemeProvider } from 'theme-ui';
import { Container, Box, Grid } from 'theme-ui';
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

export async function getServerSideProps({ req }) {
  console.log(req.headers);
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

  return {
    props: {
      ip,
    }, // will be passed to the page component as props
  };
}



export default function IndexPage({ip}) {
  return (

<Container sx={styles.containerBox} >     
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
</Container> 
  
  );
}

const styles = {
  coreFeature: {
      py: [0, null, null, 2, null, 7],
      position: 'relative',
  },
  containerBox: {
      pl:[10, null, null,50,null, 100],
      pr:[10, null, null, 50,null, 100],
  },

};

