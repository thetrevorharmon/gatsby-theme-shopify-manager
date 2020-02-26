import React, {useContext} from 'react';
import {render} from '@testing-library/react';
import {Context} from '../Context';
import {ContextProvider} from '../ContextProvider';
import {TestHelpers} from '../utils';
import ShopifyBuy from 'shopify-buy';

describe('ContextProvider', () => {
  it('passes the shopName and accessToken to the shopify-buy client', () => {
    const shopifyBuySpy = jest.spyOn(ShopifyBuy, 'buildClient');
    function MockComponent() {
      const {client} = useContext(Context);
      return <p>{typeof client}</p>;
    }

    render(
      <ContextProvider
        shopName={TestHelpers.FAKE_SHOP_NAME}
        accessToken={TestHelpers.FAKE_ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    expect(shopifyBuySpy).toHaveBeenCalledWith({
      storefrontAccessToken: TestHelpers.FAKE_ACCESS_TOKEN,
      domain: TestHelpers.FAKE_DOMAIN,
    });
  });

  it('builds a shopify-buy client', () => {
    const shopifyBuySpy = jest.spyOn(ShopifyBuy, 'buildClient');
    function MockComponent() {
      const {client} = useContext(Context);
      return <p>{typeof client}</p>;
    }

    render(
      <ContextProvider
        shopName={TestHelpers.FAKE_DOMAIN}
        accessToken={TestHelpers.FAKE_ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    expect(shopifyBuySpy).toHaveBeenCalled();
  });

  it('provides a client object and setClient function to the consumer', () => {
    function MockComponent() {
      const {client, setClient} = useContext(Context);

      if (client == null) {
        throw new Error('Client is undefined');
      }

      try {
        setClient(client);
      } catch {
        throw new Error('setClient is using default value');
      }

      return <p>pass</p>;
    }

    const wrapper = render(
      <ContextProvider
        shopName={TestHelpers.FAKE_SHOP_NAME}
        accessToken={TestHelpers.FAKE_ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    expect(wrapper.findByText('pass')).toBeTruthy();
  });
});
