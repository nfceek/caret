

import { Container, Box, Grid } from 'theme-ui';
import SectionHeader from 'components/section-header';
import FeatureCard from 'components/feature-card.js';
import Theme from '../theme';

const Performance = '../assets/feature/performance.svg';
const Partnership = '../assets/feature/partnership.svg';
const Subscription = '../assets/feature/subscription.svg';
const Support = '../assets/feature/support.svg';

const data = [
  {
    id: 1,
    imgSrc: Performance,
    alttext: 'Fast Setup',
    title: 'Super Fast Setup',
    text:
      'Get your Caret tag in 5 minutes or less',
  },
  {
    id: 2,
    imgSrc: Partnership,
    alttext: 'Pack the address',
    title: 'Compact ^ Tag name',
    text:
      'Turn this: 0xElslkdoIF0oelsldkxxxxImwlYD6c, into this: ^Gold',
  },
  {
    id: 3,
    imgSrc: Subscription,
    alttext: 'You Rule',
    title: 'Become King of your crypto wallet Address',
    text:
      'Go with a Pro or Premium Subscription and personalize your Caret Tag',
  },
  {
    id: 4,
    imgSrc: Support,
    alttext: 'share',
    title: 'Share your Caret Tag',
    text:
      'Let others find your crypto wallet address with a simple search of the IFPS.',
  },
];

export default function Feature() {
  return (
   <Box sx={{ variant: 'section.feature'}}>
     <Container>
       <SectionHeader  
          slogan=''
          title='Benefits & Features'
        />
        <Grid sx={styles.grid} >
          {data.map((item) => (
            <FeatureCard 
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
  grid: {
    pt: [0, null, null, null, null, null, 2],
    px: [5, 6, 0, null, 7, 8, 7],
    gridGap: [
      '40px 0',
      null,
      '45px 30px',
      null,
      '60px 50px',
      '70px 50px',
      null,
      '80px 90px',
    ],
    gridTemplateColumns: ['repeat(1,1fr)', null, 'repeat(2,1fr)'],
  },
};
