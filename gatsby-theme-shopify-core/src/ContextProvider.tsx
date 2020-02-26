import React, {useState} from 'react';
import Client from 'shopify-buy';
import {Context} from './Context';

interface Props {
  shopName: string;
  accessToken: string;
  children: React.ReactNode;
}

export function ContextProvider({shopName, accessToken, children}: Props) {
  let initialClient;
  try {
    initialClient = Client.buildClient({
      storefrontAccessToken: accessToken,
      domain: `${shopName}.myshopify.com`,
    });
  } catch (e) {
    throw new Error(
      'Unable to build shopify-buy client object. Please make sure that your access token and domain are correct.',
    );
  }

  const [client, setClient] = useState<Client.Client>(initialClient);

  return (
    <Context.Provider
      value={{
        client,
        setClient,
      }}
    >
      {children}
    </Context.Provider>
  );
}
