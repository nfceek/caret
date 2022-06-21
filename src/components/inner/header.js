
import React, { useState } from "react"
import { useRouter } from 'next/router'

import { Container, Box, Flex, Button } from 'theme-ui';
import { keyframes } from '@emotion/react';
import Link from 'next/link'
import Logo from 'components/logo';
import MobileDrawer from './mobile-drawer';
import menuItems from './header.data';


export default function Header({ className }) {
  const cLogo = '/assets/caret-logo01.png'
  const uLogo = '/assets/user_sm.png'
  const [userIn, setUserIn] = useState(0)               // is user logged in
  const router = useRouter()
  
  React.useEffect(() => {
    if(typeof window !== "undefined" || localStorage.caret !== null){
      setUserIn(1)
    }
  }, [])

  async function SignIn(){
    router.push('/login')
  }
  
  function logout() {
    localStorage.removeItem('caret');
    router.push('/');
  }

  return (

    <Box id='id' className='bnrHeader' sx={styles.header} >
      <Container sx={styles.container}>
        <Logo src={cLogo} />
        <Flex as='nav' sx={styles.nav}>

        </Flex>

        {userIn === 1 &&
          <div className='flex display-inline'>
            <div className=''>
              <Link href='/dashboard'>
                <img src={uLogo} alt='acct' />
              </Link>
            </div>
            <div className='ml-4 '>
              <a onClick={logout} className="btn btn-link">Logout</a>
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
