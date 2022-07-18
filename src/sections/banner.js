
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

  const ShapeLeft = '../assets/shape-left.png'
  const ShapeRight = '../assets/shape-right.png'

export default function Banner() {
  const BannerImg = '../assets/caret-banner-open.png'

  const router = useRouter()
  const validationRequest = Yup.object().shape({
    request: Yup.string()
        .matches(/^[a-zA-Z-_\s]*$/, "Only Alpha characters, dash ( - ) and underscore ( _ ) are allowed.")
        .min(4, 'Password must be at least 5 characters'),         
    });

  const formOptions = { resolver: yupResolver(validationRequest) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

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
    <Box id='home' sx={styles.banner}>
      <Container sx={styles.banner.container} >
        <Box sx={styles.banner.contentBox} >
        <div>
          
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className ="card-body"> 
                    <div>                
                      <div className="form-group">
                          <div className='text-4xl m-4'>Begin Your Journey</div>
                            <div className='flex justify-center'>
                              <div className='w-1/3'>
                                <input name="request" type="text" placeholder="Choose Your Caret Word" {...register('request')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                              </div>
                            </div>
                          <div className="invalid-feedback">{errors.request?.message}</div>
                      </div>
                      <div>                                 
                      <button type="submit" className ="btn btn-primary" id="caretCheck" >Check Availability</button>  
                      </div>
                    </div>                                       
                  </div>
              </form>                      
        </div>
        </Box>
        <Box sx={styles.banner.imageBox}>
          <img src={BannerImg} alt='banner' />
        </Box>
      </Container>
    </Box>
  );
}

const styles = {
  
  banner: {
    pt: ['75px', '75px', '75px', '80px', null, null, '105px', '105px'],
    //pt: ['140px', '145px', '155px', '170px', null, null, '180px', '215px'],
    pb: [2, null, 0, null, 2, 0, null, 105],
    position: 'relative',
    zIndex: 2,
    '&::before': {
      position: 'absolute',
      content: '""',
      bottom: 6,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: -1,
      backgroundImage: `url(${ShapeLeft})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'bottom left',
      backgroundSize: '36%',
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      bottom: '40px',
      right: 0,
      height: '100%',
      width: '100%',
      zIndex: -1,
      backgroundImage: `url(${ShapeRight})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: 'bottom right',
      backgroundSize: '32%',
    },
    container: {
      minHeight: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    contentBox: {
      width: ['100%', '90%', '535px', null, '57%', '60%', '68%', '60%'],
      mx: 'auto',
      textAlign: 'center',
      mb: ['40px', null, null, null, null, 7],
    },
    imageBox: {
      justifyContent: 'center',
      textAlign: 'center',
      display: 'inline-flex',
      mb: [0, null, -6, null, null, '-40px', null, -3],
      img: {
        position: 'relative',
        height: [245, 'auto'],
      },
    },
  },
};
