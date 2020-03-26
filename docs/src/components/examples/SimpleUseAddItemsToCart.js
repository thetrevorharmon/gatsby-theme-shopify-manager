import React from 'react';
import {Button} from 'theme-ui';
import {useAddItemsToCart, useCartCount} from 'gatsby-theme-shopify-manager';
import {useProducts} from '../../utils';

export function SimpleUseAddItemsToCart() {
  const cartCount = useCartCount();
  const addItemsToCart = useAddItemsToCart();
  const products = useProducts();

  async function addToCart() {
    const items = [
      {
        variantId: products[0].variants[0].shopifyId,
        quantity: 1,
      },
    ];

    try {
      await addItemsToCart(items);
      alert('Successfully added that item to your cart!');
    } catch {
      alert('There was a problem adding that item to your cart.');
    }
  }

  return (
    <>
      <p>There are currently {cartCount} items in your cart.</p>
      <Button onClick={addToCart} sx={{mb: 3}}>
        Add items to your cart
      </Button>
    </>
  );
}
