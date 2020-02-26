import React, {useContext} from 'react';
import {render} from '@testing-library/react';
import {Context} from '../Context';
import {ContextProvider} from '../ContextProvider';
import {TestHelpers} from '../utils';
import ShopifyBuy from 'shopify-buy';

describe('ContextProvider', () => {
  it('throws an error if the accessToken is missing', () => {
    function MockComponent() {
      const {client} = useContext(Context);
      return <p>{typeof client}</p>;
    }

    const originalError = console.error;
    console.error = jest.fn();

    expect(() =>
      render(
        <ContextProvider
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          accessToken={null}
          shopName={TestHelpers.FAKE_SHOP_NAME}
        >
          <MockComponent />
        </ContextProvider>,
      ),
    ).toThrow();

    console.error = originalError;
  });

  it('throws an error if the shopName is missing', () => {
    function MockComponent() {
      const {client} = useContext(Context);
      return <p>{typeof client}</p>;
    }

    const originalError = console.error;
    console.error = jest.fn();

    expect(() =>
      render(
        <ContextProvider
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          shopName={null}
          accessToken={TestHelpers.FAKE_ACCESS_TOKEN}
        >
          <MockComponent />
        </ContextProvider>,
      ),
    ).toThrow();

    console.error = originalError;
  });

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

  it('provides a client object to the consumer', () => {
    function MockComponent() {
      const {client} = useContext(Context);

      if (client == null) {
        throw new Error('Client is undefined');
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

  it('provides a cart object and setCart function to the consumer', () => {
    function MockComponent() {
      const {cart, setCart} = useContext(Context);

      try {
        setCart(cart);
      } catch {
        throw new Error('setCart is using default value');
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
