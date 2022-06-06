

import { Box, Container, Image, Text } from 'theme-ui';
import { Link } from 'components/link';
import data from './footer.data';
//import cLogo from '/public//public/assets/caret-logo01.png';


export default function Footer() {
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
        </Box>
        <Text sx={styles.copyright}>
          Copyright by {new Date().getFullYear() } Caret.Cloud
        </Text>
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
    pb: ['40px', null, '100px'],
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
  },
};
