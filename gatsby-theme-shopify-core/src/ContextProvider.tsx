import React, {useState, useEffect} from 'react';
import ShopifyBuy from 'shopify-buy';
import {Context} from './Context';

interface Props {
  shopName: string;
  accessToken: string;
  children: React.ReactNode;
}

export function ContextProvider({shopName, accessToken, children}: Props) {
  if (shopName == null || accessToken == null) {
    throw new Error(
      'Unable to build shopify-buy client object. Please make sure that your access token and domain are correct.',
    );
  }

  const [cart, setCart] = useState<ShopifyBuy.Cart>();
  const client = ShopifyBuy.buildClient({
    storefrontAccessToken: accessToken,
    domain: `${shopName}.myshopify.com`,
  });

  useEffect(() => {
    let mounted = true;

    async function setupCart() {
      if (mounted) {
        const cart = await client.checkout.create();
        setCart(cart);
      }
    }

    setupCart();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Context.Provider
      value={{
        client,
        cart,
        setCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}
