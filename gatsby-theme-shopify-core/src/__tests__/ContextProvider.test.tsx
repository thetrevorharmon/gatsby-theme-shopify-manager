import React, {useContext, useEffect} from 'react';
import {render, wait} from '@testing-library/react';
import {Context} from '../Context';
import {ContextProvider} from '../ContextProvider';
import {Mocks} from '../mocks';
import {LocalStorage, LocalStorageKeys, isCart} from '../utils';
import ShopifyBuy from 'shopify-buy';

function MockComponent() {
  const {cart} = useContext(Context);
  return <p>{cart?.id}</p>;
}

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

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
          // @ts-ignore
          accessToken={null}
          shopName={Mocks.SHOP_NAME}
        >
          <MockComponent />
        </ContextProvider>,
      ),
    ).toThrow();

    console.error = originalError;
  });

  it('throws an error if the shopName is missing', () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() =>
      render(
        <ContextProvider
          // @ts-ignore
          shopName={null}
          accessToken={Mocks.ACCESS_TOKEN}
        >
          <MockComponent />
        </ContextProvider>,
      ),
    ).toThrow();

    console.error = originalError;
  });

  it('passes the shopName and accessToken to the shopify-buy client', async () => {
    const shopifyBuySpy = jest.spyOn(ShopifyBuy, 'buildClient');

    render(
      <ContextProvider
        shopName={Mocks.SHOP_NAME}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() =>
      expect(shopifyBuySpy).toHaveBeenCalledWith({
        storefrontAccessToken: Mocks.ACCESS_TOKEN,
        domain: Mocks.DOMAIN,
      }),
    );
  });

  it('builds a shopify-buy client', async () => {
    const shopifyBuySpy = jest.spyOn(ShopifyBuy, 'buildClient');

    render(
      <ContextProvider shopName={Mocks.DOMAIN} accessToken={Mocks.ACCESS_TOKEN}>
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => expect(shopifyBuySpy).toHaveBeenCalled());
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
        shopName={Mocks.SHOP_NAME}
        accessToken={Mocks.ACCESS_TOKEN}
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
        shopName={Mocks.SHOP_NAME}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    expect(wrapper.findByText('pass')).toBeTruthy();
  });

  it('creates a new cart object if there is no initial cart object', async () => {
    const createCartSpy = jest.spyOn(Mocks.CLIENT.checkout, 'create');

    function MockComponent() {
      const {cart} = useContext(Context);
      const content = cart?.id === Mocks.CART.id ? 'pass' : 'fail';

      return <p>{content}</p>;
    }

    const wrapper = render(
      <ContextProvider shopName={Mocks.DOMAIN} accessToken={Mocks.ACCESS_TOKEN}>
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(createCartSpy).toHaveBeenCalled();
      expect(wrapper.getByText('pass')).toBeTruthy();
    });
  });

  it('returns an initial cart object from local storage if it exists', async () => {
    const initialCart = {...Mocks.CART, id: 'testInitialCart'};
    const localStorageSpy = jest.spyOn(LocalStorage, 'getInitialCart');
    const createCartSpy = jest.spyOn(Mocks.CLIENT.checkout, 'create');

    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(initialCart));

    function MockComponent() {
      const {cart} = useContext(Context);
      const content = cart?.id === initialCart.id ? 'pass' : 'fail';

      return <p>{content}</p>;
    }

    const wrapper = render(
      <ContextProvider shopName={Mocks.DOMAIN} accessToken={Mocks.ACCESS_TOKEN}>
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(createCartSpy).not.toHaveBeenCalled();
      expect(localStorageSpy).toHaveBeenCalled();
      expect(wrapper.getByText('pass')).toBeTruthy();
    });
  });

  it('saves the cart object in local storage every time it changes', async () => {
    const localStorageSpy = jest.spyOn(LocalStorage, 'set');
    const newCart = {
      ...Mocks.CART,
      id: 'newCart',
    };

    function MockComponent() {
      const {setCart} = useContext(Context);

      useEffect(() => {
        if (isCart(newCart)) {
          setCart(newCart);
        }
      }, []);

      return <p>Content</p>;
    }

    render(
      <ContextProvider shopName={Mocks.DOMAIN} accessToken={Mocks.ACCESS_TOKEN}>
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(localStorageSpy).toHaveBeenCalledTimes(3);
    });
  });
});
