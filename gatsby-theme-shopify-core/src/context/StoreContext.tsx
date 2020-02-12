import React, {useState} from 'react';
import Client from 'shopify-buy';

import {useCoreOptions} from '../utils';

interface StoreContextShape {
  client?: Client.Client;
  setClient(client: Client.Client): void;
}

const StoreContext = React.createContext<StoreContextShape>({
  client: undefined,
  setClient: () => {
    throw Error('You forgot to wrap this in a Provider object');
  },
});

interface Props {
  children: React.ReactNode;
}

export function StoreContextProvider({children}: Props) {
  const {shopName, accessToken} = useCoreOptions();

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
    <StoreContext.Provider
      value={{
        client,
        setClient,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
