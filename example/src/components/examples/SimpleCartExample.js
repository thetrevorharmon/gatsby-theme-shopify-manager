import React from 'react';
import {useCart} from 'gatsby-theme-shopify-manager';

export function SimpleCartExample() {
  const cart = useCart();

  if (cart == null || cart.lineItems.length < 1) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <>
      <p>Your cart has {cart.lineItems.length} items.</p>
      <ul>
        {cart.lineItems.map((lineItem) => (
          <li key={lineItem.title}>
            {lineItem.title} - {lineItem.variant.title}
          </li>
        ))}
      </ul>
    </>
  );
}
