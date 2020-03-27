import React from 'react';
import {useCartItems} from 'gatsby-theme-shopify-manager';

export function ExampleUseCartItems() {
  const cartItems = useCartItems();

  if (cartItems.length < 1) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <>
      <p>Your cart has the following items:</p>
      <ul>
        {cartItems.map((lineItem) => (
          <li key={lineItem.title}>
            {lineItem.title} - {lineItem.variant.title}
          </li>
        ))}
      </ul>
    </>
  );
}
