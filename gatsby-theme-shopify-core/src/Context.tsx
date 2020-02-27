import React from 'react';
import ShopifyBuy from 'shopify-buy';

interface ContextShape {
  client?: ShopifyBuy.Client;
  cart?: ShopifyBuy.Cart;
  setCart: React.Dispatch<React.SetStateAction<ShopifyBuy.Cart | undefined>>;
}

export const Context = React.createContext<ContextShape>({
  client: undefined,
  cart: undefined,
  setCart: () => {
    throw Error('You forgot to wrap this in a Provider object');
  },
});
