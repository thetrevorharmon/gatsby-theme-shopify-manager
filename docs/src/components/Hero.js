/** @jsx jsx */
import {jsx, Box, Text, Styled, Flex} from 'theme-ui';
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

  return (
    <Flex sx={{justifyContent: 'space-between', my: 5}}>
      <Box sx={{alignSelf: 'center'}}>
        <Styled.h1 sx={{mb: 2, maxWidth: '340px'}}>{title}</Styled.h1>
        <Text sx={{color: 'heading'}}>{description}</Text>
      </Box>
      <Box>
        <img
          alt="A cheery-looking hipster holding a laptop wearing a yellow shirt, a black hat, and glasses"
          src={HipsterWithMac}
        />
      </Box>
    </Flex>
  );
}
