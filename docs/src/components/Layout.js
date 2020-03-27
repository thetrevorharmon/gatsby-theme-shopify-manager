/** @jsx jsx */
import {Styled, jsx} from 'theme-ui';
import {useStaticQuery, graphql} from 'gatsby';
import {Link} from '../components';

const Layout = ({children}) => {
  const {
    site: {
      siteMetadata: {twitterHandle},
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
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
      <div
        sx={{
          margin: `0 auto`,
          maxWidth: 960,
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
