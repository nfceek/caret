
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'

import { Container, Box, Flex, Button } from 'theme-ui';
import { keyframes } from '@emotion/react';
import { Link } from 'react-scroll';
import Logo from 'components/logo';
import MobileDrawer from './mobile-drawer';
import menuItems from './header.data';

import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'next-share';


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'


export default function Header({ className, uStatus }) {
  const cLogo = '/assets/caret-logo01.png'
  const uLogo = '/assets/user_sm.png'
  const sLogo = '/assets/share-30.png';
  const cIcon = '/assets/caretIconSm.png'

  const [userIn, setUserIn] = useState()               // is user logged in
  const router = useRouter()
  
  useEffect(() => {
    var item = localStorage.getItem('caret')
    
    //console.log('header item ' + item)
    chStatus(item)
  }, [])

  async function chStatus(data){
    //console.log('log status ' + data)
    if(data === null){
      setUserIn(0)
    }else{
      setUserIn(1)
    }
    //console.log('user status ' + userIn)
  }

  async function SignIn(){
    router.push('/login')
  }
  
  function logout() {
    localStorage.removeItem('caret');
    setUserIn(0)  
    //localStorage.removeItem('wallet');
    router.push('/');
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (

    <Box id='id' className='bnrHeader' sx={styles.header} >
      <Container sx={styles.container}>
        <Logo src={cLogo} />
        <Flex as='nav' sx={styles.nav}>

        </Flex>

        {userIn === 1 &&
          <div className='flex display-inline ml-6'>
            <div className='flex display-inline'>
              <div className=''>
                <img id='imgInnerAcct' src={uLogo} alt='acct' />
              </div>
              <div className='ml-4 '>
                <a onClick={logout} className="btn btn-link">Logout</a>
              </div>
            </div>
          </div> 
        }
        <MobileDrawer />             
      </Container>
    </Box>
  );
}

const positionAnim = keyframes`
  from {
    position: fixed;
    opacity: 1;
  }

  to {
    position: absolute;
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

const styles = {
  header: {
    color: 'text',
    fontWeight: 'body',
    py: 4,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    transition: 'all 0.4s ease',
    animation: `${positionAnim} 0.4s ease`,
    '.donate__btn': {
      flexShrink: 0,
      mr: [15, 20, null, null, 0],
      ml: ['auto', null, null, null, 0],
    },
    '&.sticky': {
      position: 'fixed',
      backgroundColor: 'background',
      color: '#000000',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
      py: 3,
      'nev > a': {
        color: 'text',
      },
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    mx: 'auto',
    display: 'none',
    '@media screen and (min-width: 1024px)': {
      display: 'block',
    },
    a: {
      fontSize: 2,
      fontWeight: 'body',
      px: 5,
      cursor: 'pointer',
      lineHeight: '1.2',
      transition: 'all 0.15s',
      '&:hover': {
        color: 'primary',
      },
      '&.active': {
        color: 'primary',
      },
    },
  },
};
