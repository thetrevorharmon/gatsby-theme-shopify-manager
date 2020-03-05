import React, {useState} from 'react';
import {wait, fireEvent} from '@testing-library/react';
import {renderWithContext} from '../mocks';
import {LocalStorage, LocalStorageKeys} from '../utils';
import {useAddItemsToCart} from '../useAddItemsToCart';
import {LineItemPatch} from '../types';

function MockComponent({items}: {items: LineItemPatch[]}) {
  const addItemsToCart = useAddItemsToCart();
  const [result, setResult] = useState<boolean | null>(null);

  async function addItem() {
    const newResult = await addItemsToCart(items);
    setResult(newResult);
  }

  return (
    <>
      <button type="button" onClick={addItem}>
        Add to Cart
      </button>
      <p>Result: {String(result)}</p>
    </>
  );
}

const originalError = console.error;
const mockConsoleError = jest.fn();

beforeEach(() => {
  console.error = mockConsoleError;
});

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
  console.error = originalError;
});

describe('useAddItemsToCart()', () => {
  it('returns true if the items are added to the cart', async () => {
    const wrapper = renderWithContext(
      <MockComponent
        items={[
          {
            variantId: 'variantId',
            quantity: 1,
          },
        ]}
      />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Add to Cart/));
    });

    expect(wrapper.getByText(/Result: true/)).toBeTruthy();
  });

  it('updates the cart state if the items are added to the cart', async () => {
    const localStorageSpy = jest.spyOn(LocalStorage, 'set');
    const wrapper = renderWithContext(
      <MockComponent
        items={[
          {
            variantId: 'newVariantId',
            quantity: 1,
          },
        ]}
      />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Add to Cart/));
    });

    const newCart = JSON.parse(
      LocalStorage.get(LocalStorageKeys.CART) || '',
    ) as ShopifyBuy.Cart;

    // @ts-ignore
    expect(newCart.lineItems.slice(-1)[0].variantId).toBe('newVariantId');
    expect(localStorageSpy).toHaveBeenCalledTimes(3);
  });

  it('returns false if there are no items passed to the function', async () => {
    const wrapper = renderWithContext(<MockComponent items={[]} />);
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Add to Cart/));
    });

    expect(wrapper.getByText(/Result: false/)).toBeTruthy();
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Must include at least one line item, empty line items found',
    );
  });

  it("returns false if the input does not conform to the client's protocol", async () => {
    const items = [{variantId: 'variantId'}];
    const wrapper = renderWithContext(
      <MockComponent
        // @ts-ignore
        items={items}
      />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Add to Cart/));
    });

    expect(wrapper.getByText(/Result: false/)).toBeTruthy();
  });
});
