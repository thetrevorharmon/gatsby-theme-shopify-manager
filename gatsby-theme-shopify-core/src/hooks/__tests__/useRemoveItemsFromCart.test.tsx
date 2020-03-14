import React, {useState} from 'react';
import {wait, fireEvent} from '@testing-library/react';
import {Mocks, renderWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useRemoveItemsFromCart} from '../useRemoveItemsFromCart';

function MockComponent({variantIds}: {variantIds: string[]}) {
  const removeItemsFromCart = useRemoveItemsFromCart();
  const [result, setResult] = useState<boolean | null>(null);

  async function addItem() {
    const newResult = await removeItemsFromCart(variantIds);
    setResult(newResult);
  }

  return (
    <>
      <button type="button" onClick={addItem}>
        Remove from Cart
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

describe('useRemoveItemsFromCart()', () => {
  it('returns true if the items are removed from the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));

    const wrapper = renderWithContext(
      <MockComponent variantIds={[Mocks.VARIANT_ID_IN_CART]} />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Remove from Cart/));
    });

    expect(wrapper.getByText(/Result: true/)).toBeTruthy();
  });

  it('updates the cart state if the items are removed from the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const localStorageSpy = jest.spyOn(LocalStorage, 'set');

    const wrapper = renderWithContext(
      <MockComponent variantIds={[Mocks.VARIANT_ID_IN_CART]} />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Remove from Cart/));
    });

    const newCart = JSON.parse(
      LocalStorage.get(LocalStorageKeys.CART) || '',
    ) as ShopifyBuy.Cart;

    function findInLineItems(variantId: string) {
      const result = newCart.lineItems
        .map((lineItem) => {
          // @ts-ignore
          if (lineItem.variant.id === variantId) {
            return lineItem.id;
          }
          return null;
        })
        .filter(Boolean);
      return result;
    }

    expect(findInLineItems(Mocks.VARIANT_ID_IN_CART)).toHaveLength(0);
    expect(newCart.lineItems).toHaveLength(Mocks.CART.lineItems.length - 1);
    expect(localStorageSpy).toHaveBeenCalledTimes(3);
  });

  it('returns false if there are no variant Ids passed to the function', async () => {
    const wrapper = renderWithContext(<MockComponent variantIds={[]} />);
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Remove from Cart/));
    });

    expect(wrapper.getByText(/Result: false/)).toBeTruthy();
    expect(mockConsoleError).toHaveBeenCalledWith(
      new Error('Must include at least one item to remove'),
    );
  });

  it('returns false if a given variant Id is not found in the cart', async () => {
    const wrapper = renderWithContext(
      <MockComponent
        variantIds={[Mocks.VARIANT_ID_IN_CART, 'some_bogus_id']}
      />,
    );
    await wait(() => {
      fireEvent.click(wrapper.getByText(/Remove from Cart/));
    });

    expect(wrapper.getByText(/Result: false/)).toBeTruthy();
    expect(mockConsoleError).toHaveBeenCalledWith(
      new Error(
        'Could not find line item in cart with variant id: some_bogus_id',
      ),
    );
  });
});
