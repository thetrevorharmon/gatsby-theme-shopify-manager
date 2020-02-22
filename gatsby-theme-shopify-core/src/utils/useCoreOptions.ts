import {useStaticQuery, graphql} from 'gatsby';

interface CoreOptionsQueryShape {
  coreOptions: {
    shopName: string;
    accessToken: string;
  };
}

export function useCoreOptions() {
  const {coreOptions}: CoreOptionsQueryShape = useStaticQuery(graphql`
    query CoreOptionsQuery {
      coreOptions(id: {eq: "gatsby-theme-shopify-core"}) {
        shopName
        accessToken
      }
    }
  `);

  return coreOptions;
}
