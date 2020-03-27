import React from 'react';
import {useCart} from 'gatsby-theme-shopify-manager';

export function ExampleUseCart() {
  const cart = useCart();

  if (cart == null) {
    return <p>The cart object is currently null.</p>;
  }

  const cartDate = new Date(cart.createdAt).toLocaleDateString();

  return (
    <p>
      Your cart was created on {cartDate}.
      <br />
      You have ${cart.totalPrice} worth of products in your cart.
    </p>
  );
}
