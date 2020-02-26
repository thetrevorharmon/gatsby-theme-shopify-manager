import React from 'react';
import ShopifyBuy from 'shopify-buy';

interface ContextShape {
  client?: ShopifyBuy.Client;
  setClient(client: ShopifyBuy.Client): void;
}

export const Context = React.createContext<ContextShape>({
  client: undefined,
  setClient: () => {
    throw Error('You forgot to wrap this in a Provider object');
  },
});
