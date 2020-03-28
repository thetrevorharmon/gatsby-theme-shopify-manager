/** @jsx jsx */
import {jsx, Box, Button} from 'theme-ui';
import {
  useAddItemToCart,
  useCartItems,
  useRemoveItemFromCart,
  useRemoveItemsFromCart,
} from 'gatsby-theme-shopify-manager';
import {useProducts} from '../../utils';

export function ControlStrip() {
  return (
    <Box sx={{padding: 3, pb: 3, backgroundColor: 'backgroundDarker'}}>
      <AddItemButton />
      <RemoveItemButton />
      <EmptyCartButton />
    </Box>
  );
}

export function AddItemButton() {
  const addItemToCart = useAddItemToCart();
  const products = useProducts();

  async function addToCart() {
    const productIndex = Math.floor(
      Math.random() * Math.floor(products.length),
    );
    const variantId = products[productIndex].variants[0].shopifyId;
    const quantity = 1;

    try {
      await addItemToCart(variantId, quantity);
      alert('Successfully added an item to your cart!');
    } catch {
      alert('There was a problem adding an item to your cart.');
    }
  }

  return (
    <Button variant="controlStrip" onClick={addToCart}>
      Add Item
    </Button>
  );
}

export function RemoveItemButton() {
  const removeItemFromCart = useRemoveItemFromCart();
  const cartItems = useCartItems();

  async function removeFromCart() {
    if (cartItems.length < 1) {
      return;
    }

    const [cartItemToRemove] = cartItems;
    console.log(cartItemToRemove);

    try {
      await removeItemFromCart(cartItemToRemove.variant.id);
      alert('Successfully removed an item from your cart!');
    } catch {
      alert('There was a problem removing an item from your cart.');
    }
  }

  return (
    <Button sx={{mx: 2}} variant="controlStrip" onClick={removeFromCart}>
      Remove Item
    </Button>
  );
}

export function EmptyCartButton() {
  const removeItemsFromCart = useRemoveItemsFromCart();
  const cartItems = useCartItems();

  async function emptyCart() {
    if (cartItems.length < 1) {
      return;
    }

    try {
      const variantIds = cartItems.map((cartItem) => cartItem.variant.id);
      await removeItemsFromCart(variantIds);
      alert('Successfully removed all items from your cart!');
    } catch {
      alert('There was a problem removing an item from your cart.');
    }
  }

  return (
    <Button variant="controlStrip" onClick={emptyCart}>
      Empty Cart
    </Button>
  );
}
