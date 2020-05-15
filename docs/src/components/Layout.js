/** @jsx jsx */
import {Styled, jsx} from 'theme-ui';
import {useStaticQuery, graphql} from 'gatsby';
import {Link} from '../components';
import {Helmet as ReactHelmet} from 'react-helmet';
import SocialCardPath from '../assets/images/social-card.png';

const Layout = ({children}) => {
  const {
    site: {
      siteMetadata: {title, description, twitterHandle, siteUrl},
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          twitterHandle
          siteUrl
        }
      }
    }
  `);

  const heartEmoji = (
    <span role="img" aria-label="love">
      ❤️
    </span>
  );

  const twitterLink = (
    <Link url={`http://twitter.com/${twitterHandle}`}>{twitterHandle}</Link>
  );

  const meta = [
    {
      name: 'og:title',
      content: title,
    },
    {
      name: 'og:site_name',
      content: title,
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'og:description',
      content: description,
    },
    {
      name: 'og:url',
      content: siteUrl,
    },
    {
      name: 'og:image',
      content: `${siteUrl}${SocialCardPath}`,
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:creator',
      content: twitterHandle,
    },
  ];

  return (
    <Styled.root>
      <ReactHelmet title={title} meta={meta} />
      <div
        sx={{
          margin: `0 auto`,
          maxWidth: 800,
          padding: 3,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer sx={{mt: 6}}>
          <Styled.p>
            Built with {heartEmoji} by {twitterLink}.
          </Styled.p>
        </footer>
      </div>
    </Styled.root>
  );
};

export {Layout};
