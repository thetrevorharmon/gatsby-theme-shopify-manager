import React, {useState} from 'react';
import {graphql} from 'gatsby';
import Image from 'gatsby-image';
import {
  useClient,
  useCart,
  useCartCount,
  useAddItemToCart,
} from 'gatsby-theme-shopify-core';

function IndexPage({data}) {
  const {
    allShopifyProduct: {nodes: products},
  } = data;

  const variants = products.map(({title, variants}) => {
    const variant = variants[0];
    return {...variant, title};
  });

  const [isLoading, setIsLoading] = useState(false);

  const client = useClient();
  const {setCart} = useCart();
  const cartCount = useCartCount();
  const addItemToCart = useAddItemToCart();

  async function addToCart(shopifyId) {
    setIsLoading(true);
    const result = await addItemToCart(shopifyId, 1);
    const message =
      result === true
        ? 'Successfully added to cart!'
        : 'There was a problem adding this to the cart.';
    alert(message);
    setIsLoading(false);
  }

  async function clearCart() {
    setCart(null);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  const name = client != null ? client.config.domain : 'Broken!';

  return (
    <div>
      <h1>Hello! Your domain is {name}</h1>
      <h2>You have {cartCount} items in your cart</h2>
      <button type="button" onClick={clearCart}>
        Clear Cart
      </button>
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
            <button
              disabled={isLoading}
              type="button"
              onClick={() => addToCart(variant.shopifyId)}
            >
              {isLoading ? 'Loading...' : 'Add to Cart'}
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
