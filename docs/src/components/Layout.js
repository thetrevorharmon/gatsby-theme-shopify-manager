/** @jsx jsx */
import {Styled, jsx} from 'theme-ui';
import {useStaticQuery, graphql} from 'gatsby';
import {Link} from '../components';
import {Helmet as ReactHelmet} from 'react-helmet';

const Layout = ({children}) => {
  const {
    site: {
      siteMetadata: {title, description, twitterHandle},
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          twitterHandle
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

  return (
    <Styled.root>
      <ReactHelmet title={title} meta={description} />
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
