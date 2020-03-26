import {useStaticQuery, graphql} from 'gatsby';

export function useProducts() {
  const {
    allShopifyProduct: {nodes: rawProducts},
  } = useStaticQuery(
    graphql`
      query ProductQuery {
        allShopifyProduct(filter: {}, limit: 3) {
          nodes {
            shopifyId
            description
            descriptionHtml
            title
            variants {
              shopifyId
              image {
                id
              }
              selectedOptions {
                name
                value
              }
              title
              price
            }
          }
        }
      }
    `,
  );

  const products = rawProducts.map((product) => {
    const [variant] = product.variants;
    return {
      ...product,
      variant,
    };
  });

  return products;
}
