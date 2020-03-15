import {LocalStorage, LocalStorageKeys} from '../../utils';
import {Mocks, renderHookWithContext} from '../../mocks';
import {useGetLineItem} from '../useGetLineItem';

afterEach(() => {
  LocalStorage.set(LocalStorageKeys.CART, '');
  jest.clearAllMocks();
});

describe('useGetLineItem()', () => {
  it('returns the item from the cart', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.CART));
    const {result} = await renderHookWithContext(() => useGetLineItem());

    expect(result.current(Mocks.VARIANT_ID_IN_CART)).toMatchObject({
      title: "Men's Down Jacket",
    });
  });

  it('returns null if the cart is empty', async () => {
    (Mocks.CLIENT.checkout.fetch as jest.Mock).mockImplementationOnce(
      () => Mocks.EMPTY_CART,
    );
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));

    const {result} = await renderHookWithContext(() => useGetLineItem(), {
      shouldSetInitialCart: false,
    });

    expect(result.current(Mocks.VARIANT_ID_IN_CART)).toBeNull();
  });

  it('returns null if it cannot find the item', async () => {
    (Mocks.CLIENT.checkout.fetch as jest.Mock).mockImplementationOnce(
      () => Mocks.EMPTY_CART,
    );
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));

    const {result} = await renderHookWithContext(() => useGetLineItem(), {
      shouldSetInitialCart: false,
    });

    expect(result.current('some_wrong_id')).toBeNull();
  });
});
