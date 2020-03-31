import React from 'react';
import {ContextProvider} from './src';
import withDefaults from './defaults';

export const wrapRootElement = ({element}, themeOptions) => {
  const {
    shouldWrapRootElementWithProvider,
    shopName,
    accessToken,
  } = withDefaults(themeOptions);

  if (shouldWrapRootElementWithProvider === false) {
    return element;
  }

  const missingApiInformation = shopName == null || accessToken == null;
  if (missingApiInformation) {
    throw new Error(
      'gatsby-theme-shopify-manager: You forgot to pass in a shopName or accessToken to the theme options',
    );
  }

  return (
    <ContextProvider shopName={shopName} accessToken={accessToken}>
      {element}
    </ContextProvider>
  );
};
