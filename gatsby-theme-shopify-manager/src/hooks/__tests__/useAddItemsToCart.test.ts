import {act} from '@testing-library/react-hooks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {Mocks, getCurrentCart, renderHookWithContext} from '../../mocks';
import {useAddItemsToCart} from '../useAddItemsToCart';

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useAddItemsToCart()', () => {
  it('returns true if the items are added to the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const localStorageSpy = jest.spyOn(LocalStorage, 'set');

    const {result, waitForNextUpdate} = await renderHookWithContext(() =>
      useAddItemsToCart(),
    );

    act(() => {
      result.current([
        {
          variantId: 'newVariantId',
          quantity: 1,
        },
      ]);
    });
    await waitForNextUpdate();

    const cart = getCurrentCart();

    // @ts-ignore
    expect(cart.lineItems.slice(-1)[0].variantId).toBe('newVariantId');
    expect(localStorageSpy).toHaveBeenCalledTimes(4);
  });

  it('throws an error if there are no line items', async () => {
    const {result} = await renderHookWithContext(() => useAddItemsToCart());

    await expect(result.current([])).rejects.toThrow(
      'Must include at least one line item, empty line items found',
    );
  });

  it('throws an error if the given line item has no variant id', async () => {
    const {result} = await renderHookWithContext(() => useAddItemsToCart());

    // @ts-ignore
    await expect(result.current([{quantity: 1}])).rejects.toThrow(
      'Missing variantId in item',
    );
  });

  it('throws an error if the given line item has no quantity', async () => {
    const {result} = await renderHookWithContext(() => useAddItemsToCart());

    // @ts-ignore
    await expect(result.current([{variantId: 'some_id'}])).rejects.toThrow(
      'Missing quantity in item with variant id: some_id',
    );
  });

  it('throws an error if the given line item has a quantity that is not numeric', async () => {
    const {result} = await renderHookWithContext(() => useAddItemsToCart());

    await expect(
      // @ts-ignore
      result.current([{variantId: 'some_id', quantity: 'one'}]),
    ).rejects.toThrow(
      'Quantity is not a number in item with variant id: some_id',
    );
  });

  it('throws an error if the given line item has a quantity that is less than one', async () => {
    const {result} = await renderHookWithContext(() => useAddItemsToCart());

    await expect(
      // @ts-ignore
      result.current([{variantId: 'some_id', quantity: 0}]),
    ).rejects.toThrow(
      'Quantity must not be less than one in item with variant id: some_id',
    );
  });
});
