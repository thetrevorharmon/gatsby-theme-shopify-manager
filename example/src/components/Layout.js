/** @jsx jsx */
import {Styled, jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import {useStaticQuery, graphql} from 'gatsby';

const Layout = ({children}) => {
  const {
    site: {
      siteMetadata: {title},
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
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
            © {new Date().getFullYear()} {title}, Built with
            {` `}
            <Styled.a href="https://www.gatsbyjs.org">Gatsby</Styled.a>
            {` and `}
            <Styled.a href="https://www.shopify.ca">Shopify</Styled.a>.
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
