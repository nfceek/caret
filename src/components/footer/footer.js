

import { Box, Container, Image, Text } from 'theme-ui';
import { Link } from 'components/link';
import data from './footer.data';
import { FaFacebookF, FaTwitter, FaGithubAlt, FaDribbble } from 'react-icons/fa';

const social = [
  {
    path: '/',
    icon: <FaFacebookF />,
  },
  {
    path: '/',
    icon: <FaTwitter />,
  },
  {
    path: '/',
    icon: <FaGithubAlt />,
  },
  {
    path: '/',
    icon: <FaDribbble />,
  },
];

export default function Footer() {
const cLogo = '/assets/caret-logo01.png';
  
  return (
    <div >
      <Container>
        <Box sx={styles.footerBottomArea}>
          <Link path='/'>
            <Image src={cLogo} alt='logo' />
          </Link>
        </Box>
        <Box sx={styles.menus}>
          <nav>
            {data.menuItem.map((item,i) => (
              <Link 
                path={item.path}
                key={i}
                label={item.label}
                sx={styles.link}
              />
            ))} 
          </nav>
 
          <Box sx={styles.social}>
              {social.map((socialItem, i) =>(
                <Box as="span" key={i} sx={styles.social.icon}>
                  <Link to={socialItem.path}> {socialItem.icon} </Link>
                </Box>
              ))}            
            </Box>  
            <Box >
              <Text sx={styles.copyright}>
                Copyright {new Date().getFullYear() } Caret.Cloud
              </Text>  
            </Box>                 
        </Box>
      </Container>
    </div> 
  );
}

const styles = {
  footer: {

  },
  footerBottomArea: {
    borderTop: '1px solid',
    borderTopColor: 'border_color',
    display: 'flex',
    pt: [7, null, 8],
    pb: ['10px', null, '10px'],
    textAlign: 'center',
    flexDirection: 'column',
  },
  menus: {
    mt: [3, 4],
    mb: 2,
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  },
  link: {
    fontSize: [1, '15px'],
    color: 'text',
    fontWeight: '400',
    mb: 2,
    cursor: 'pointer',
    transition: 'all 0.35s',
    display: 'block',
    textDecoration: 'none',
    lineHeight: [1.5, null, 1.8],
    px: [2, null, 4],
    ':hover': {
      color: 'primary',
    },
  },
  copyright: {
    fontSize: [1, '15px'],
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pt: [5, null, 5]
  },
  social: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'text',
      fontSize: 14,
      mr: '15px',
      transition: 'all 0.25s',
      cursor: 'pointer',
      ':last-child': {
        mr: '0',
      },
      '&:hover': {
        color: 'secondary',
      },
    },
  },

};
