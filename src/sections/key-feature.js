

import { Container, Grid } from 'theme-ui';
import SectionHeader from '../components/section-header';
import FeatureCardColumn from 'components/feature-card-column.js';
import Performance from '/public/assets/key-feature/performance.svg';
import Partnership from '/public/assets/key-feature/partnership.svg';
import Subscription from '/public/assets/key-feature/subscription.svg';
import Support from '/public/assets/key-feature/support.svg';
import FeatureCard from 'components/feature-card';

const data = [
  {
    id: 1,
    imgSrc: Performance,
    altText: 'Fast and Easy',
    title: 'Fast Performance',
    text: 
      'Setup your caret tag in minutes. Share with everyone.',
  },
  {
    id: 2,
    imgSrc: Partnership,
    altText: 'Pack Crypto Address',
    title: 'Pack Your Crypto Wallet Address',
    text:
      'Reduce that long crypto wallet address into a short & easy to remember tag',
  },
  {
    id: 3,
    imgSrc: Subscription,
    altText: 'Pro Subscription',
    title: 'Pro & Premium Subscriptions',
    text:
      'Get customized names or reserve a custom Caret tag word even if you don`t have a crypto wallet.',
  },
  {
    id: 4,
    imgSrc: Support,
    altText: 'Business Support',
    title: 'Business Support',
    text:
      'Contact us to register your company, business or website.',
  },
];

export default function KeyFeature() {
  return (
    <section id='feature' sx={{ variant: 'section.KeyFeature' }}>
      <Container >
        <SectionHeader
          slogan='What we do ...'
          title='Benefits & Services'
          />
          <Grid sx={styles.grid} >
            {data.map((item) => (
              <FeatureCardColumn
                key={item.id}
                src={item.imgSrc}
                alt={item.altText}
                title={item.title}
                text={item.text}
              />
            ))}
      </Grid>
      </Container>
    </section>
  );
}

const styles = {
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
