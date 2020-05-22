import React from 'react';
import {ContextProvider} from '../../ContextProvider';
import {MYSHOPIFY_DOMAIN, ACCESS_TOKEN} from '../constants';
import {CART} from '../cart';
import {ContextOptions} from './types';
import {LocalStorage, LocalStorageKeys} from '../../utils';

export function wrapWithContext(givenOptions?: Partial<ContextOptions>) {
  const defaults = {
    shopName: MYSHOPIFY_DOMAIN,
    accessToken: ACCESS_TOKEN,
    shouldSetInitialCart: true,
  };

  const options = Object.assign({}, defaults, givenOptions);

  if (options.shouldSetInitialCart) {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(CART));
  }

  const wrapperFunction = ({children}: {children?: React.ReactNode}) => (
    <ContextProvider
      shopName={options.shopName}
      accessToken={options.accessToken}
    >
      {children}
    </ContextProvider>
  );

  return wrapperFunction;
}
