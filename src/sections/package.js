

import { Container, Box, Flex } from 'theme-ui';
import { keyframes } from '@emotion/react';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import PriceCard from 'components/price-card';
import ButtonGroup from 'components/button-group';
import SectionHeader from 'components/section-header';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from 'react-icons/io';

const packages = {
  personal: [
    {
      id: 1,
      name: 'Free Plan',
      description: 'For Personal Use',
      buttonText: 'Get my Caret',
      priceWithUnit: 'FREE',
      points: [
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: 'Register Caret via browser crypto wallet',
          isAvailable: true,
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: "Does Not Expire",
          isAvailable: true,
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: 'Single Crypto Wallet Address',
          isAvailable: true,
        },
        {
          id: 4,
          icon: <IoIosCheckmarkCircle />,
          text: 'Custom Caret Word + 3 digits',
          isAvailable: true,
        },
        {
          id: 5,
          icon: <IoIosCheckmarkCircle />,
          text: 'Must have Crypto Wallet Address',
          isAvailable: true,
        },
        {
          id:6,
          icon: <IoIosCheckmarkCircle />,
          text: 'Single Chain',
          isAvailable: true,
        },
        {
          id: 7,
          icon: <IoIosCloseCircle />,
          text: 'No Public/Private Key Protection',
          isAvailable: true,
        },
      ],
    },
    {
      id: 2,
      header: 'Suggested',
      name: 'Personal Pro',
      description: 'For Most Users',
      priceWithUnit: '$ 5.00 / One Time Fee',
      buttonText: 'Order Now',
      anotherOption: '',
      points: [
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: 'We Register Caret Tag for You',
          isAvailable: true,
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: "Does Not Expire",
          isAvailable: true,
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: 'Single Crypto Wallet Address',
          isAvailable: true,
        },
        {
          id: 4,
          icon: <IoIosCheckmarkCircle />,
          text: 'Choose Custom Caret Tag',
          isAvailable: true,
        },
        {
          id: 5,
          icon: <IoIosCheckmarkCircle />,
          text: 'Get Caret Tag without Cryto Wallet Address',
          isAvailable: true,
        },
        {
          id:6,
          icon: <IoIosCheckmarkCircle />,
          text: 'Single Chain',
          isAvailable: true,
        },
        {
          id: 7,
          icon: <IoIosCheckmarkCircle />,
          text: 'Private/Public Key Protection',
          isAvailable: true,
        },
      ],
    },
    {
      id: 3,
      headerIcon: <IoIosCheckmarkCircle />,
      name: 'Personal Premium',
      description: 'For the Crypto Pro',
      priceWithUnit: '$ 20.00 / One Time Fee',
      buttonText: 'Order Now',
      anotherOption: '',
      points: [
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: 'We Register Caret Tag for You',
          isAvailable: true,
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: "Does Not Expire",
          isAvailable: true,
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: "3 Cypto Wallet Addresses",
          isAvailable: true,
        },
        {
          id: 4,
          icon: <IoIosCheckmarkCircle />,
          text: 'Choose Custom Caret Tag',
          isAvailable: true,
        },
        {
          id: 5,
          icon: <IoIosCheckmarkCircle />,
          text: 'Get Caret without Crypto Wallet Address',
          isAvailable: true,
        },
        {
          id: 6,
          icon: <IoIosCheckmarkCircle />,
          text: 'Caret Tags for multiple chains',
          isAvailable: true,
        },        
        {
          id: 7,
          icon: <IoIosCheckmarkCircle />,
          text: 'Private/Public Key Protection',
          isAvailable: true,
        },
      ],
    },
  ],
  business: [
    {
      id: 1,
      name: 'Business Basic',
      description: 'For Single Crypto Address',
      buttonText: 'Contact Us',
      priceWithUnit: '',
      points: [
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: "We Register Caret",
          isAvailable: true,
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: 'Single TLD Business Domain name registration',
          isAvailable: true,
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: 'Custom Caret Name registration',
          isAvailable: true,
        },
        {
          id: 4,
          icon: <IoIosCloseCircle />,
          text: 'Public/Private Key Protection',
          isAvailable: true,
        },
      ],
    },
    {
      id: 2,
      header: 'Suggested',
      name: 'Business Pro',
      description: 'For small to medium sized businesses',
      priceWithUnit: '',
      buttonText: 'Contact Us',
      anotherOption: '',
      points: [
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: 'We Register Caret',
          isAvailable: true,
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: 'Multi TLD Domain Name registration',
          isAvailable: true,
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: "Custom Caret Name registration",
          isAvailable: true,
        },
        {
          id: 4,
          icon: <IoIosCheckmarkCircle />,
          text: 'Public/Private Key Protection',
          isAvailable: true,
        },
      ],
    },
    {
      id: 3,
      headerIcon: <IoIosCheckmarkCircle />,
      name: 'Business Premium',
      description: 'Enterprise Level',
      priceWithUnit: '',
      buttonText: 'Contact Us',
      anotherOption: '',
      points: [
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: 'Dedicated Service Agent',
          isAvailable: true,
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: 'Dedicated Domain Name registration',
          isAvailable: true,
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: "Dedicated Caret Name registration",
          isAvailable: true,
        },
        {
          id: 4,
          icon: <IoIosCheckmarkCircle />,
          text: 'Dedicated Public/Private Key Protection',
          isAvailable: true,
        },
      ],
    },
  ],
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    draggable: false,
  },
  tablet: {
    breakpoint: { max: 1023, min: 640 },
    items: 2,
    draggable: true,
  },
  mobile: {
    breakpoint: { max: 639, min: 0 },
    items: 1,
    draggable: true,
  },
};

export default function Package() {
  const { personal, business } = packages;
  const [state, setState] = useState({
    active: 'personal',
    pricingPlan: personal,
  })

  const handlePricingPlan = (plan) => {
    if(plan === 'business') { 
      setState({active: 'business', pricingPlan: business })
    } else {
      setState({active: 'personal', pricingPlan: personal})
    }
  }

  const sliderParams = {
    additionalTransfrom: 0,
    arrows: false,
    autoPlaySpeed: 3000,
    centerMode: false,
    className: '',
    slidesToSlide: 1,
    items: 3,
    containerClass: 'carousel-container',
    customButtonGroup: <ButtonGroup />,
    dotListClass: '',
    focusOnSelect: false,
    infinite: false,
    keyBoardControl: false,
    itemClass: '',
    minimumTouchDrag: 80,
    renderButtonGroupOutside: true,
    renderDotsOutside: false,
    responsive: responsive,
    showDots: false,
    sliderClass: '',
  };

  return (
    <Box id='pricing' sx={{ variant: 'section.pricing'}}>
      <Container>
        <SectionHeader 
          slogan='PRICING PLANS'
          title='Choose a plan'
          />
      </Container>
    
    <Flex sx={styles.buttonGroup}>
      <Box sx={styles.buttonGroupInner}>
        <button 
          className={state.active === 'personal' ? 'active' : ''}
          type='button'
          aria-label='Personal'
          onClick={() => handlePricingPlan('personal')}
          >
            Personal Plans
        </button>
        <button 
          className={state.active === 'business' ? 'active' : ''}
          type='button'
          aria-label='business'
          onClick={() => handlePricingPlan('business')}
          >
            Business Plans
        </button> 
      </Box>
    </Flex>

    <Box sx={styles.pricingWrapper} className='pricing__wrapper'>
      <Carousel {... sliderParams}>
        {state.pricingPlan.map((packageData) => (
          <Box sx={styles.pricingItem} key={packageData.id}>
            <PriceCard data={packageData} />
          </Box>
        ))}
      </Carousel>
    </Box>
  </Box>
  )
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeIn2 = keyframes`
  from {
    transform: translateY(50%);
    opacity: 0;
  }
  to {
		transform: translateY(0);
    opacity: 1;
  }
`;
const styles = {
  pricingWrapper: {
    mb: '-40px',
    mt: '-40px',
    mx: -3,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '&.pricing__wrapper .package__card': {
      '.package__header': {
        animation: `${fadeIn} 0.8s ease-in`,
      },
      'ul > li': {
        animation: `${fadeIn2} 0.7s ease-in`,
      },
      '.package__price': {
        animation: `${fadeIn2} 0.9s ease-in`,
      },
      button: {
        animation: `${fadeIn2} 1s ease-in`,
      },
    },
    '.carousel-container': {
      width: '100%',
      '> ul > li ': {
        display: 'flex',
      },
    },
    '.button__group': {
      display: ['flex', null, null, null, 'none'],
      mb: [4, null, null, null, 0],
    },
  },
  pricingItem: {
    mx: 3,
    display: 'flex',
    flexShrink: 0,
    flex: '1 1 auto',
  },
  buttonGroup: {
    justifyContent: 'center',
    mb: '7',
    mt: ['-15px', '-35px'],
    position: 'relative',
    zIndex: 2,
  },
  buttonGroupInner: {
    display: 'flex',
    padding: '7px',
    margin: '0 auto',
    borderRadius: '5px',
    backgroundColor: '#F7F8FB',
    button: {
      border: 0,
      padding: ['15px 20px', '15px 27px'],
      borderRadius: '5px',
      color: 'text',
      fontSize: [1, 2],
      lineHeight: 1.2,
      fontWeight: 500,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontFamily: 'body',
      letterSpacing: '-0.24px',
      transition: 'all 0.3s',
      '&.active': {
        color: '#0f2137',
        backgroundColor: '#ffffff',
        boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
      },
      '&:focus': {
        outline: 0,
      },
    },
  },
};
