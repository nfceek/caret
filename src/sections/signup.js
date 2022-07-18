
import React, { useState } from "react"
import { Container, Box, Grid, Text, Heading, Button, Image } from 'theme-ui';

import SectionHeader from 'components/section-header';
import SignupFeature from 'components/signup-feature';
import Theme from '../theme';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

import RegisterFeature from 'components/register-feature';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

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
        'Choose a word or phrase to use as your Caret Tag',
    },
    {
      id: 2,
      imgSrc: Smart,
      alttext: 'Remember',
      title: 'Don`t add the Caret ( ^ )',
      text:
        'Do Not put a ^ before your Caret input. The system will add the Caret Symbol',
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
  const [loading, setLoading] = useState(true) 

  const router = useRouter()
  const validationRequest = Yup.object().shape({
    request: Yup.string()
        .matches(/^[a-zA-Z-_\s]*$/, "Only Alpha characters, dash ( - ) and underscore ( _ ) are allowed.")
        .min(4, 'Password must be at least 5 characters'),         
    });

  const formOptions = { resolver: yupResolver(validationRequest) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

    async function caretCheck(){

    }
    
    async function onSubmit(user) {
      var rUpper = user.request.toUpperCase()

      const item = rUpper
      //console.log(item)
      router.push(
        {
          pathname: '/purchase',
          query: {data: item}   
        }, '/purchase')
        //},)        
    }
 
    return (
        <Box id='signup' sx={{ variant : 'section.signup' }}>


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
              <div className='grid grid-rows-3 grid-flow-col gap-4'>
                <div>
                  <div className='text-3xl'>Your Journey Begins HERE!</div>
                  <div>
                    <SignupFeature title={data.title} />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className ="card-body"> 
                            {loading === true ? 
                              <div>                
                                <div className="form-group">
                                    <label>Step 1: </label>
                                    <input name="request" type="text" placeholder="Choose Your Caret Word" {...register('request')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.request?.message}</div>
                                </div>
                                <div>                                 
                                <button type="submit" className ="btn btn-primary" id="caretCheck" >Check Availability</button>  
                                </div>
                              </div>
                            :
                              <div>
                                <div className='text-6xl '>Coming 7/7 @ 7 </div>
                              </div>                    
                            }                                       
                            </div>
                        </form>                      
                  </div>
                  <div></div>
                </div>
              </div>
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
    width: ['100%', null, null, 315, 390, 400, null, 350],
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
