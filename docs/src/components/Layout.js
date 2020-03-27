/** @jsx jsx */
import {Styled, jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import {useStaticQuery, graphql} from 'gatsby';

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
            Built with{' '}
            <span role="img" aria-label="love">
              ❤️
            </span>{' '}
            by{' '}
            <a href={`http://twitter.com/${twitterHandle}`}>{twitterHandle}.</a>
          </Styled.p>
        </footer>
      </div>
    </Styled.root>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export {Layout};
