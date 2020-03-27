import React from 'react';
import {Button} from 'theme-ui';
import {useAddItemToCart, useCartCount} from 'gatsby-theme-shopify-manager';
import {useProducts} from '../../utils';

export function ExampleUseAddItemToCart() {
  const cartCount = useCartCount();
  const addItemToCart = useAddItemToCart();
  const products = useProducts();

  async function addToCart() {
    const variantId = products[0].variants[0].shopifyId;
    const quantity = 1;

    try {
      await addItemToCart(variantId, quantity);
      alert('Successfully added that item to your cart!');
    } catch {
      alert('There was a problem adding that item to your cart.');
    }
  }

  return (
    <>
      <p>There are currently {cartCount} items in your cart.</p>
      <Button onClick={addToCart} sx={{mb: 3}}>
        Add an item to your cart
      </Button>
    </>
  );
}
