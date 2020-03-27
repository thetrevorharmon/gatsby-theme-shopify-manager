import React, {useState} from 'react';
import {Flex, Button, Input} from 'theme-ui';
import {
  useUpdateItemQuantity,
  useCartItems,
} from 'gatsby-theme-shopify-manager';

export function ExampleUseUpdateItemQuantity() {
  const [quantity, setQuantity] = useState(1);
  const [item] = useCartItems();
  const updateItemQuantity = useUpdateItemQuantity();

  async function updateQuantity() {
    if (item == null) {
      return;
    }

    const variantId = item.variant.id;

    try {
      await updateItemQuantity(variantId, quantity);
      alert('Successfully updated the item quantity!');
    } catch {
      alert("There was a problem updating that item's quantity.");
    }
  }

  const itemMarkup =
    item == null ? (
      <p>Your cart is empty.</p>
    ) : (
      <p>
        {item.title} - {item.variant.title} ({item.quantity})
      </p>
    );

  const formMarkup = (
    <Flex sx={{alignItems: 'flex-start'}} as="form" onSubmit={updateQuantity}>
      <Input
        sx={{width: '50px', mr: 3}}
        type="number"
        defaultValue={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      />
      <Button sx={{mb: 3}}>Update quantity</Button>
    </Flex>
  );

  return (
    <>
      {itemMarkup}
      {formMarkup}
    </>
  );
}
