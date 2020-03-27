import React from 'react';
import {useCheckoutUrl} from 'gatsby-theme-shopify-manager';
import {Link} from '../../components';

export function ExampleUseCheckoutUrl() {
  const checkoutUrl = useCheckoutUrl();

  return checkoutUrl == null ? (
    <p>There is no active checkout.</p>
  ) : (
    <p>
      <Link url={checkoutUrl} target="_blank" rel="noopener noreferrer">
        Complete Your Order →
      </Link>
    </p>
  );
}
