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
        domain: Mocks.MYSHOPIFY_DOMAIN,
      }),
    );
  });

  it('appends ".myshopify.com" to shopName when customDomain evaluates false', async () => {
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
        domain: Mocks.MYSHOPIFY_DOMAIN,
      }),
    );
  });

  it('does not append ".myshopify.com" to shopName when customDomain evaluates true', async () => {
    const shopifyBuySpy = jest.spyOn(ShopifyBuy, 'buildClient');

    render(
      <ContextProvider
        shopName={Mocks.SHOP_NAME_WITH_CUSTOM_DOMAIN}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() =>
      expect(shopifyBuySpy).toHaveBeenCalledWith({
        storefrontAccessToken: Mocks.ACCESS_TOKEN,
        domain: Mocks.CUSTOM_DOMAIN,
      }),
    );
  });

  it('builds a shopify-buy client', async () => {
    const shopifyBuySpy = jest.spyOn(ShopifyBuy, 'buildClient');

    render(
      <ContextProvider
        shopName={Mocks.MYSHOPIFY_DOMAIN}
        accessToken={Mocks.ACCESS_TOKEN}
      >
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

  it('checks local storage to see if a cart object exists', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));

    const localStorageSpy = jest.spyOn(LocalStorage, 'getInitialCart');

    function MockComponent() {
      const {cart} = useContext(Context);
      const content = cart != null ? cart.id : 'fail';

      return <p>{content}</p>;
    }

    const {getByText} = render(
      <ContextProvider
        shopName={Mocks.MYSHOPIFY_DOMAIN}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(localStorageSpy).toHaveBeenCalled();
      expect(getByText(Mocks.CART.id)).toBeTruthy();
    });
  });

  it('uses the cart in local storage as the initial value if it exists', async () => {
    const initialCart = {...Mocks.CART, id: 'testInitialCart'};
    const localStorageSpy = jest.spyOn(LocalStorage, 'getInitialCart');
    const createCartSpy = jest.spyOn(Mocks.CLIENT.checkout, 'create');

    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(initialCart));

    function MockComponent() {
      const {cart} = useContext(Context);
      const content = cart != null ? cart.id : 'fail';

      return <p>{content}</p>;
    }

    const {asFragment} = render(
      <ContextProvider
        shopName={Mocks.MYSHOPIFY_DOMAIN}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    const firstRender = asFragment();

    await wait(() => {
      expect(localStorageSpy).toHaveBeenCalled();
      expect(createCartSpy).not.toHaveBeenCalled();
      expect(firstRender.textContent).toBe(initialCart.id);
    });
  });

  it('creates a new cart object if there is no initial cart object', async () => {
    const createCartSpy = jest.spyOn(Mocks.CLIENT.checkout, 'create');

    function MockComponent() {
      const {cart} = useContext(Context);
      const content = cart != null ? cart.id : 'fail';

      return <p>{content}</p>;
    }

    const {asFragment} = render(
      <ContextProvider
        shopName={Mocks.MYSHOPIFY_DOMAIN}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(createCartSpy).toHaveBeenCalled();
      expect(asFragment().textContent).toBe(Mocks.CART.id);
    });
  });

  it('refreshes the cart object if there is an initial cart object', async () => {
    const refreshedCart = {...Mocks.CART, id: 'refreshedCartId'};
    (Mocks.CLIENT.checkout.fetch as jest.Mock).mockImplementationOnce(
      () => refreshedCart,
    );
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const fetchCartSpy = jest.spyOn(Mocks.CLIENT.checkout, 'fetch');

    function MockComponent() {
      const {cart} = useContext(Context);
      const content = cart != null ? cart.id : 'fail';

      return <p>{content}</p>;
    }

    const {asFragment} = render(
      <ContextProvider
        shopName={Mocks.MYSHOPIFY_DOMAIN}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(fetchCartSpy).toHaveBeenCalled();
      expect(asFragment().textContent).toBe(refreshedCart.id);
    });
  });

  it('drops the cart object and creates a new one if the refreshed cart shows that it has been purchased', async () => {
    (Mocks.CLIENT.checkout.fetch as jest.Mock).mockImplementationOnce(
      () => Mocks.PURCHASED_CART,
    );
    (Mocks.CLIENT.checkout.create as jest.Mock).mockImplementationOnce(
      () => Mocks.EMPTY_CART,
    );

    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const fetchCartSpy = jest.spyOn(Mocks.CLIENT.checkout, 'fetch');
    const createCartSpy = jest.spyOn(Mocks.CLIENT.checkout, 'create');

    function MockComponent() {
      const {cart} = useContext(Context);
      const content = cart != null ? cart.id : 'fail';

      return <p>{content}</p>;
    }

    const {asFragment} = render(
      <ContextProvider
        shopName={Mocks.MYSHOPIFY_DOMAIN}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(fetchCartSpy).toHaveBeenCalled();
      expect(createCartSpy).toHaveBeenCalled();
      expect(asFragment().textContent).toBe(Mocks.EMPTY_CART.id);
    });
  });

  it('creates a new cart if the refreshed cart returns null', async () => {
    (Mocks.CLIENT.checkout.fetch as jest.Mock).mockImplementationOnce(
      () => null,
    );
    (Mocks.CLIENT.checkout.create as jest.Mock).mockImplementationOnce(
      () => Mocks.EMPTY_CART,
    );

    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const fetchCartSpy = jest.spyOn(Mocks.CLIENT.checkout, 'fetch');
    const createCartSpy = jest.spyOn(Mocks.CLIENT.checkout, 'create');

    function MockComponent() {
      const {cart} = useContext(Context);
      const content = cart != null ? cart.id : 'fail';

      return <p>{content}</p>;
    }

    const {asFragment} = render(
      <ContextProvider
        shopName={Mocks.MYSHOPIFY_DOMAIN}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(fetchCartSpy).toHaveBeenCalled();
      expect(createCartSpy).toHaveBeenCalled();
      expect(asFragment().textContent).toBe(Mocks.EMPTY_CART.id);
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
      <ContextProvider
        shopName={Mocks.MYSHOPIFY_DOMAIN}
        accessToken={Mocks.ACCESS_TOKEN}
      >
        <MockComponent />
      </ContextProvider>,
    );

    await wait(() => {
      expect(localStorageSpy).toHaveBeenCalledTimes(3);
    });
  });
});
