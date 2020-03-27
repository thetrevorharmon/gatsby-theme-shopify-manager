import React from 'react';
import {Button} from 'theme-ui';
import {
  useRemoveItemFromCart,
  useCartItems,
} from 'gatsby-theme-shopify-manager';

export function ExampleUseRemoveItemFromCart() {
  const cartItems = useCartItems();
  const removeItemFromCart = useRemoveItemFromCart();

  async function removeFromCart() {
    if (cartItems.length < 1) {
      return;
    }
    const variantId = cartItems[0].variant.id;

    try {
      await removeItemFromCart(variantId);
      alert('Successfully removed an item from your cart!');
    } catch {
      alert('There was a problem removing that item from your cart.');
    }
  }

  const cartMarkup =
    cartItems.length > 0 ? (
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
    ) : (
      <p>Your cart is empty.</p>
    );

  return (
    <>
      {cartMarkup}
      <Button onClick={removeFromCart} sx={{mb: 3}}>
        Remove item from your cart
      </Button>
    </>
  );
}
