

import { Container, Box, Grid, Text, Heading, Button, Image } from 'theme-ui';
import { keyframes } from '@emotion/react';
import SectionHeader from 'components/section-header';
import SignupFeature from 'components/signup-feature';
import Theme from '../theme';
import { useRouter } from 'next/router'

const shapePattern = '../assets/shape-pattern1.png';
const Smart = '../assets/services/smart.svg';
const Secure = '../assets/services/secure.svg';


const data = {
  subTitle: 'How it works',
  title: 'Create Your Caret',
  features: [
    {
      id: 1,
      imgSrc: Smart,
      alttext: 'Remember',
      title: 'Pick a word, name or phrase',
      text:
        'Choose a word or phrase to use as your Caret Label.',
    },
    {
      id: 2,
      imgSrc: Smart,
      alttext: 'Remember',
      title: 'Don`t add the Caret ( ^ )',
      text:
        'Do Not put a ^ before your Caret Label, we will add that create your Caret Tag',
    },
    {
      id: 3,
      imgSrc: Smart,
      alttext: 'Remember',
      title: 'Why are there Numbers on the end?',
      text:
        'See Below',
    },
    {
      id: 4,
      imgSrc: Smart,
      alttext: 'Remember',
      title: 'Why upgrade to a Pro or Premium plan.',
      text:
        'See Below'
    },

  ],
};


export default function Signup() {

  const router = useRouter()

  async function caretCheck(){

  }

 
  return (
    <Box sx={{ variant : 'section.signup' }}>
      <Container sx={styles.containerBox} >
        <Box sx={styles.halfLBox} >
          <SignupFeature subTitle={data.subTitle} />
          <Grid sx={styles.grid}>
            {data.features.map((feature, i) =>(
              <Box sx={styles.card} key={feature.id}>
                <Image src={feature.imgSrc} alt={feature.alttext} sx={styles.icon} />
                <Box sx={styles.wrapper}>
                  <Heading sx={styles.wrapper.title}>{feature.title}</Heading>
                  <Text sx={styles.wrapper.subTitle}>{feature.text}</Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
        <Box sx={styles.halfRBox}>
          <SignupFeature title={data.title} />
                <form>
                  <div className ="card-body">                   
                    <div className ="form-group">
                      <label htmlFor="tagname">Step 1) Choose your Caret Word : </label>
                      <input type="text" className ="form-control" id="sign-up-username" required="required" />
                    </div>
                     {/*
                    <div className ="form-group">
                      <label htmlFor="username">Step 1 ->  : </label>
                      <input type="text" className ="form-control" id="sign-up-title" />
                    </div>
                   
                    <div className ="form-group">
                      <label htmlFor="nftname">Add NFT: </label>
                      <input type="text" className ="form-control" id="sign-up-title" />
                    </div>
                    
                    <div className ="form-group">
                      <label htmlFor="email">Your Email : </label>
                      <input type="text" className ="form-control" id="sign-up-title" />
                    </div>

                      <p>checkbox - if no wallet address require pwd</p>

                    <div className ="form-group">
                      <label htmlFor="pwd">Password : </label>
                      <input type="text" className ="form-control" id="sign-up-title" />
                    </div>
                    <div className ="form-group">
                      <label htmlFor="username">Wallet Address :</label>
                      <span className ="eth-address"></span>
                        <input type="text" className ="form-control" id="sign-up-eth-address" value="0x..." disabled />                   
                    </div>
                    */}                    
                    <div>                                 
                      <button type="submit" className ="btn btn-primary" id="caretCheck" onClick={caretCheck}>Coming Soon</button>  
                    </div>                                 
                  </div>
                </form>

        </Box>                       
      </Container>
    </Box>
  )


}

const styles = {
  coreFeature: {
    py: [0, null, null, 2, null, 7],
    position: 'relative',
  },
  containerBox: {
    display: 'flex',
    alignItems: ['flex-start', null, null, 'center'],
    justifyContent: ['flex-start', null, null, 'space-between'],
    flexDirection: ['column', null, null, 'row'],
    pb: [0, null, null, null, null, 7],
  },
  shapeBox: {
    position: 'absolute',
    bottom: -68,
    left: -160,
    zIndex: -1,
    display: ['none', null, null, null, null, 'inline-block'],
  },
  halfLBox: {
    width: ['100%', null, null, 315, 390, 450, null, 500],
    flexShrink: 0,
    mb: [7, null, 60, 0],
    textAlign: ['center', null, null, 'left'],
  },
  halfRBox: {
    width: ['100%', null, null, 315, 390, 450, null, 500],
    flexShrink: 0,
    mb: [7, null, 60, 0],
    textAlign: ['center', null, null, 'left'],
  },
  grid: {
    pr: [2, 0, null, null, 6, '70px'],
    pl: [2, 0],
    pt: [2, null, null, null, 3],
    mx: 'auto',
    width: ['100%', 370, 420, '100%'],
    gridGap: ['35px 0', null, null, null, '50px 0'],
    gridTemplateColumns: ['repeat(1,1fr)'],
  },
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    transition: 'all 0.3s',
  },

  icon: {
    width: ['45px', null, null, null, '55px'],
    height: 'auto',
    flexShrink: 0,
    mr: [3, null, null, null, 4],
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    mt: '-5px',
    title: {
      fontSize: 3,
      color: 'heading_secondary',
      lineHeight: 1.4,
      fontWeight: 700,
      mb: [2, null, 3, 2, 3],
    },

    subTitle: {
      fontSize: [1, null, null, '14px', 1],
      fontWeight: 400,
      lineHeight: 1.9,
    },
  },
  videoWrapper: {
    maxWidth: '100%',
    position: 'relative',
    width: '900px',
    '&:before': {
      content: '""',
      display: 'block',
      paddingTop: '56.25%',
    },
    iframe: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },
};
