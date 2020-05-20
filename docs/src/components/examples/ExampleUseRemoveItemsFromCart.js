import React from 'react';
import {Button} from 'theme-ui';
import {
  useRemoveItemsFromCart,
  useCartItems,
} from 'gatsby-theme-shopify-manager';

export function ExampleUseRemoveItemsFromCart() {
  const keyModifier = 'ExampleUseRemoveItemsFromCart';
  const cartItems = useCartItems();
  const removeItemsFromCart = useRemoveItemsFromCart();

  async function removeFromCart() {
    if (cartItems.length < 1) {
      return;
    }
    const variantId = cartItems[0].variant.id;

    try {
      await removeItemsFromCart([variantId]);
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
            <li key={`${keyModifier}-${lineItem.id}`}>
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
        Remove items from your cart
      </Button>
    </>
  );
}
