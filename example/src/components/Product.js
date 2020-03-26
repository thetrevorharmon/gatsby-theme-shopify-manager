import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';

export function Product() {
  const {
    allShopifyProduct: {nodes},
  } = useStaticQuery(
    graphql`
      query ProductQuery {
        allShopifyProduct(filter: {}, limit: 1) {
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
  const [product] = nodes;
  const [variant] = product.variants;

  return (
    <p>
      {product.title} - {variant.title}
    </p>
  );
}
