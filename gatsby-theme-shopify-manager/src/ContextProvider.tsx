import React, {useState, useEffect} from 'react';
import ShopifyBuy from 'shopify-buy';
import {Context} from './Context';
import {LocalStorage, LocalStorageKeys} from './utils';

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

  const initialCart = LocalStorage.getInitialCart();
  const [cart, setCart] = useState<ShopifyBuy.Cart | null>(initialCart);

  const isCustomDomain = shopName.includes('.');

  const client = ShopifyBuy.buildClient({
    storefrontAccessToken: accessToken,
    domain: isCustomDomain ? shopName : `${shopName}.myshopify.com`,
  });

  useEffect(() => {
    async function getNewCart() {
      const newCart = await client.checkout.create();
      setCart(newCart);
    }

    async function refreshExistingCart(cartId: string) {
      try {
        const refreshedCart = await client.checkout.fetch(cartId);

        if (refreshedCart == null) {
          return getNewCart();
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const cartHasBeenPurchased = refreshedCart.completedAt != null;
        
        const cartHasInvalidLineItems = cart.lineItems.find(
          ({ variant }) => variant == null
        );

        if (cartHasBeenPurchased || cartHasInvalidLineItems) {
          getNewCart();
        } else {
          setCart(refreshedCart);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (cart == null) {
      getNewCart();
    } else {
      refreshExistingCart(String(cart.id));
    }
  }, []);

  useEffect(() => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(cart));
  }, [cart]);

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
