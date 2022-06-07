
{/** @jsx jsx */}
import { jsx } from 'theme-ui';
import { Container, Grid } from 'theme-ui';
import SectionHeader from '../components/section-header';
import FeatureCardColumn from 'components/feature-card-column.js';

const Performance = '../assets/key-feature/performance.svg';
const Partnership = '../assets/key-feature/partnership.svg';
const Subscription = '../assets/key-feature/subscription.svg';
const Support = '../assets/key-feature/support.svg';

const data = [
  {
    id: 1,
    imgSrc: Performance,
    alttext: 'Fast and Easy',
    title: 'Fast Performance',
    text: 
      'Setup your caret tag in minutes. Share with everyone.',
  },
  {
    id: 2,
    imgSrc: Partnership,
    alttext: 'Pack Crypto Address',
    title: 'Pack Your Crypto Wallet Address',
    text:
      'Reduce that long crypto wallet address into a short & easy to remember tag',
  },
  {
    id: 3,
    imgSrc: Subscription,
    alttext: 'Pro Subscription',
    title: 'Pro & Premium Subscriptions',
    text:
      'Get customized names or reserve a custom Caret tag word even if you don`t have a crypto wallet.',
  },
  {
    id: 4,
    imgSrc: Support,
    alttext: 'Business Support',
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
                alt={item.alttext}
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
