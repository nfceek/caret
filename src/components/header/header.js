
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
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'next-share';


import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'




export default function Header({ className, uStatus}) {
  const cLogo = '/assets/caret-logo01.png'
  const uLogo = '/assets/user_sm.png'
  const sLogo = '/assets/share-30.png';
  const cIcon = '/assets/caretIconSm.png'
  
  const [userIn, setUserIn] = useState()               
  const router = useRouter()
  
  var item = uStatus
  //console.log('uStatus in ' + item)

  useEffect(() => {
    var item = localStorage.getItem('caret')
    //var item = uStatus
    //console.log('uStatus in ' + item)
    chStatus(item)
  }, [])

  function chStatus(data){
    //console.log('log status ' + data)
    if(data === null){
      setUserIn(0)
    }else{
      setUserIn(1)
    }
    //console.log('user status ' + userIn)
  }

  async function uAcct(){
    router.push('/dashboard')
  }

  async function signIn(){

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
          {menuItems.map((menuItem, i) => (
            <Link
              activeClass='active'
              to={menuItem.path}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              key={i}
            >
              {menuItem.label}
            </Link>
          ))}
        </Flex>
        {userIn === 1 ?
          <div className='flex display-inline ml-6'>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  <img id='imgShare' src={uLogo} alt='acct'/>                   
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1 pl-2">
                    <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/dashboard"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            <div className='flex display-inline'>
                              <div> <img id='imgShare' src={cIcon} alt='acct'/> </div>
                              <div className='pl-4 pt-4'> My Account</div> 
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                        href="/logout"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        <div className='flex display-inline'>
                          <div> <img id='imgShare' src={cIcon} alt='acct'/>   </div>
                          <div className='pl-4 pt-4'> Logout</div> 
                        </div>
                      </a>
                      )} 
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div> 
        : 
          <div className='flex display-inline ml-6'>
            <div className='flex display-inline ml-6'>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                      <img id='imgShare' src={uLogo} alt='acct'/>                   
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1 pl-2">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                            href="/login"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            <div className='flex display-inline'>
                              <div> <img id='imgShare' src={cIcon} alt='acct'/>   </div>
                              <div className='pl-4 pt-4'> Login</div> 
                            </div>
                          </a>
                          )} 
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
            </div>

            <div className='flex display-inline ml-6'>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <img id='imgShare' src={sLogo} alt='acct'/>                   
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 pl-2">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                          href="https://messenger.com"
                          target="_blank"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          <div className='flex display-inline'>
                            <div> <FacebookMessengerIcon size={32} round /> </div>
                            <div className='pl-4 pt-4'> Messenger</div> 
                          </div>
                        </a>
                        )} 
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="https://facebook.com"
                            target="_blank"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            <div className='flex display-inline'>
                              <div> <FacebookIcon size={32} round /> </div>
                              <div className='pl-4 pt-4'> Facebook</div> 
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="https://twitter.com"
                            target="_blank"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            <div className='flex display-inline'>
                              <div> <TwitterIcon size={32} round /> </div>
                              <div className='pl-4 pt-4'> Twitter</div> 
                            </div>
                        </a>
                        )}
                      </Menu.Item>
                      <form method="POST" action="#">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="https://t.me"
                              target="_blank"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              <div className='flex display-inline'>
                                <div> <TelegramIcon size={32} round /> </div>
                                <div className='pl-4 pt-4'> Telegram</div> 
                              </div>
                          </a>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
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
