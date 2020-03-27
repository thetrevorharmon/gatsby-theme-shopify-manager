import React from 'react';
import {useCartCount} from 'gatsby-theme-shopify-manager';

export function ExampleUseCartCount() {
  const cartCount = useCartCount();

  return <p>Your cart has {cartCount} items.</p>;
}
