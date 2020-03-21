import {useStaticQuery, graphql} from 'gatsby';
import {CoreOptions} from './types';

interface CoreOptionsQueryShape {
  coreOptions: CoreOptions;
}

export function useCoreOptions() {
  const {coreOptions}: CoreOptionsQueryShape = useStaticQuery(graphql`
    query CoreOptionsQuery {
      coreOptions(id: {eq: "gatsby-theme-shopify-manager"}) {
        shopName
        accessToken
      }
    }
  `);

  return coreOptions;
}
