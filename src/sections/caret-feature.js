

import { Container, Grid } from 'theme-ui';
import SectionHeader from 'components/section-header';
import FeatureCard from 'components/feature-card.js';

import Performance from '/public/assets/feature/performance.svg';
import Partnership from '/public/assets/feature/partnership.svg';
import Subscription from '/public/assets/feature/subscription.svg';

import Support from '/public/assets/feature/support.svg';
import Secure from '/public/assets/services/secure.svg';

const data = [
  {
    id: 1,
    imgSrc: Performance,
    altText: 'Caret Symbol',
    title: 'The Caret ( ^ ) Symbol',
    text:
      'Just like an email has an @ symbol, a hashtag has a # symbol, we use the Caret symbol to define your Caret Tag.',
  },
  {
    id: 2,
    imgSrc: Subscription,
    altText: 'verified',
    title: 'Verified Carets',
    text:
      'Golden Carets. They announce that you have arrived and we know you! ... coming soon',
  },

  {
    id: 3,
    imgSrc: Performance,
    altText: 'word',
    title: 'The Word you pick',
    text:
      'We advise you pick a word that is at least 5 characters long. Shorter words are at a premium. And famous or trademarked names, places or people may not be available.',
  },
  {
    id: 4,
    imgSrc: Subscription,
    altText: 'addl costs',
    title: 'Reserved, Premium & Banned words',
    text:
      'Some words are special. Premium words are more money because of they are rare. Reserved words are held for the copyright or domain name holder. And, Profanity is BANNED',
  },
  {
    id: 5,
    imgSrc: Performance,
    altText: 'digits',
    title: 'When are 3 digits added to the Caret Tag',
    text:
      'This applies to Free Plans. Available word choices are limited and so we add numbers to the end of Free Caret Tags to allow for variations.'

  },
  {
    id: 6,
    imgSrc: Partnership,
    altText: 'future',
    title: 'Now what do I do?',
    text:
      'I have my Caret Tag ... Now what? How to use and share Carets ... coming soon. ',
  },
];

export default function CaretFeature() {
  return (
   <section sx={{ variant: 'section.feature'}}>
     <Container>
       <SectionHeader  
          title='^ + Your_Word + ###'
          slogan='Break Down of the Caret Tag'
        />
        <Grid sx={styles.grid} >
          {data.map((item) => (
            <FeatureCard 
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
