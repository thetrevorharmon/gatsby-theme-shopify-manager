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

  const titleMarkup = (
    <Styled.h1 sx={{mb: 2, maxWidth: ['none', '340px']}}>{title}</Styled.h1>
  );

  const imgProps = {
    alt:
      'A cheery-looking hipster holding a laptop wearing a yellow shirt, a black hat, and glasses',
    src: HipsterWithMac,
  };

  const displayOnMobile = {width: '20%', display: [null, 'none']};
  const displayOnDesktop = {display: ['none', 'block']};

  return (
    <Flex sx={{justifyContent: 'space-between', my: 5}}>
      <Box sx={{alignSelf: 'center', minWidth: '275px'}}>
        {titleMarkup}
        <Flex sx={{alignItems: 'center', marginTop: ['-0.5em', '0']}}>
          <Text sx={{color: 'heading'}}>{description}</Text>
          <Styled.img sx={displayOnMobile} {...imgProps} />
        </Flex>
      </Box>
      <Box sx={displayOnDesktop}>
        <Styled.img sx={{width: 'auto'}} {...imgProps} />
      </Box>
    </Flex>
  );
}
