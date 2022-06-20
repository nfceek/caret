{/** @jsx jsx */}
import { jsx } from 'theme-ui';
import { Container, Box, Grid } from 'theme-ui';
import SectionHeader from '../components/section-header';
import FeatureCardColumn from 'components/feature-card-column.js';



const Subscription = '../assets/key-feature/subscription.svg';
const Performance = '../assets/key-feature/performance.svg';
const Partnership = '../assets/key-feature/partnership.svg';

const data = [
  {
    id: 1,
    imgSrc: Subscription,
    alttext: 'Setup',
    title: 'Easy to Setup',
    text:
      'See how quick and easy it is to get your Caret tag.',
  },
  {
    id: 2,
    imgSrc: Subscription,
    alttext: 'Remember',
    title: 'Easy to Remember',
    text:
      'Never fumble for your crypto wallet address again. Use a memorable caret tag',
  },
  {
    id: 3,
    imgSrc: Performance,
    alttext: 'Fast and Easy',
    title: 'Fast Performance',
    text: 
      'Setup your caret tag in minutes. Share with everyone.',
  },
  {
    id: 4,
    imgSrc: Partnership,
    alttext: 'Pack Crypto Address',
    title: 'Pack Your Crypto Wallet Address',
    text:
      'Reduce that long crypto wallet address into a short & easy to remember tag',
  },
];

export default function SectionLower() {
  return (
    <Box id='keyFeature' sx={styles.keyFeature}>
      <Container >
        <SectionHeader
          slogan='Registration has'
          title='Benefits & Services'
          />
          <Grid sx={styles.grid} >
            {data.map((item) => (
              <FeatureCardColumn
                key={item.id}
                src={item.imgSrc}
                alt={item.alttext}
                title={item.title}
                text={item.text}
              />
            ))}
      </Grid>
      </Container>
    </Box>
  );
}

const styles = {
  keyFeature: {
    pt: [8, null, 9, null, null, 5],
    pb: ['15px', null, 9, null, null, 5, null, '15px'],
  },
  grid: {
    width: ['100%', '80%', '100%'],
    mx: 'auto',
    gridGap: [
      '35px 0',
      null,
      '40px 40px',
      '50px 60px',
      '30px',
      '50px 40px',
      '55px 90px',
    ],
    gridTemplateColumns: [
      'repeat(1,1fr)',
      null,
      'repeat(2,1fr)',
      null,
      'repeat(4,1fr)',
    ],
  },
};
