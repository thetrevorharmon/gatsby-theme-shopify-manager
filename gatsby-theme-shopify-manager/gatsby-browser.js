import React from 'react';
import {ContextProvider} from './src';
export const wrapRootElement = ({element}, pluginOptions) => {
  const {shopName, accessToken} = pluginOptions;

  return (
    <ContextProvider shopName={shopName} accessToken={accessToken}>
      {element}
    </ContextProvider>
  );
};
