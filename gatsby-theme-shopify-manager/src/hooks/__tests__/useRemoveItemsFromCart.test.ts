import {act} from '@testing-library/react-hooks';
import {Mocks, getCurrentCart, renderHookWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useRemoveItemsFromCart} from '../useRemoveItemsFromCart';

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useRemoveItemsFromCart()', () => {
  it('removes the items from the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const localStorageSpy = jest.spyOn(LocalStorage, 'set');

    const {result, waitForNextUpdate} = await renderHookWithContext(() =>
      useRemoveItemsFromCart(),
    );

    act(() => {
      result.current([Mocks.VARIANT_ID_IN_CART]);
    });
    await waitForNextUpdate();

    const cart = getCurrentCart();

    function findInLineItems(variantId: string) {
      const result = cart.lineItems
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
    expect(cart.lineItems).toHaveLength(Mocks.CART.lineItems.length - 1);
    expect(localStorageSpy).toHaveBeenCalledTimes(4);
  });

  it('throws an error if there are no variant Ids passed to the function', async () => {
    const {result} = await renderHookWithContext(() =>
      useRemoveItemsFromCart(),
    );

    // @ts-ignore
    await expect(result.current([])).rejects.toThrow(
      'Must include at least one item to remove',
    );
  });

  it('throws an error if a given variant Id is not found in the cart', async () => {
    const {result} = await renderHookWithContext(() =>
      useRemoveItemsFromCart(),
    );

    // @ts-ignore
    await expect(
      result.current([Mocks.VARIANT_ID_IN_CART, 'some_bogus_id']),
    ).rejects.toThrow(
      'Could not find line item in cart with variant id: some_bogus_id',
    );
  });
});
