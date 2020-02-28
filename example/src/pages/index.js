import React from 'react';
import {graphql} from 'gatsby';
import Image from 'gatsby-image';
import {useClient, useCart} from 'gatsby-theme-shopify-core';

function IndexPage({data}) {
  const {
    allShopifyProduct: {nodes: products},
  } = data;

  const variants = products.map(({title, variants}) => {
    const variant = variants[0];
    return {...variant, title};
  });

  const client = useClient();
  const cart = useCart();

  async function addToCart(shopifyId) {
    const newCart = await client.checkout.addLineItems(cart.id, [
      {
        variantId: shopifyId,
        quantity: 1,
      },
    ]);

    console.log(JSON.stringify(newCart));
  }

  const name = client != null ? client.config.domain : 'Broken!';

  return (
    <div>
      <h1>Hello! Your domain is {name}</h1>
      {variants.map((variant) => {
        return (
          <div key={variant.shopifyId} style={{marginTop: '5em'}}>
            <h2>{variant.title}</h2>
            <p>
              {variant.selectedOptions.map((option) => option.value).join(', ')}
            </p>
            <div style={{maxWidth: '200px'}}>
              <Image fluid={variant.image.localFile.childImageSharp.fluid} />
            </div>
            <button type="button" onClick={() => addToCart(variant.shopifyId)}>
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default IndexPage;

export const IndexPageQuery = graphql`
  query allProducts {
    allShopifyProduct {
      nodes {
        title
        handle
        variants {
          shopifyId
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 290) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          title
          selectedOptions {
            name
            value
          }
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;
