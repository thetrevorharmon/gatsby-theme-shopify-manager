/** @jsx jsx */
import {jsx, Box, Text, Styled} from 'theme-ui';
import HipsterWithMac from '../assets/images/hipster-with-mac.svg';
import {useStaticQuery, graphql} from 'gatsby';

export function Hero() {
  const {
    site: {
      siteMetadata: {title, description},
    },
  } = useStaticQuery(graphql`
    query HeroQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const imgProps = {
    alt:
      'A cheery-looking hipster holding a laptop wearing a yellow shirt, a black hat, and glasses',
    src: HipsterWithMac,
  };

  const styles = {
    container: {
      my: 5,
      display: 'grid',
      gridTemplateColumns: ['3.5fr 1fr', '2fr 1fr'],
    },
    header: {order: 1, my: 0, alignSelf: ['center', 'end'], maxWidth: '21rem'},
    description: {
      color: 'heading',
      order: 3,
      mt: [1, 2],
      gridColumnStart: [1, 'auto'],
      gridColumnEnd: [3, 'auto'],
    },
    imageContainer: {
      order: 2,
      gridColumnStart: ['auto', 2],
      gridRowStart: ['auto', 1],
      gridRowEnd: ['auto', 3],
      alignSelf: 'center',
    },
    image: {maxWidth: '100%'},
  };

  return (
    <Box sx={styles.container}>
      <Styled.h1 sx={styles.header}>{title}</Styled.h1>
      <Text sx={styles.description}>{description}</Text>
      <Box sx={styles.imageContainer}>
        <Styled.img sx={styles.image} {...imgProps} />
      </Box>
    </Box>
  );
}
