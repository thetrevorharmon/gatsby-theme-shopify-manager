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
    const {result} = renderHookWithContext(() => useGetLineItem());

    expect(result.current(Mocks.VARIANT_ID_IN_CART)).toMatchObject({
      title: "Men's Down Jacket",
    });
  });

  it('returns null if the cart is empty', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));
    const {result} = renderHookWithContext(() => useGetLineItem(), {
      shouldSetInitialCart: false,
    });

    expect(result.current(Mocks.VARIANT_ID_IN_CART)).toBeNull();
  });

  it('returns null if it cannot find the item', async () => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(Mocks.EMPTY_CART));
    const {result} = renderHookWithContext(() => useGetLineItem(), {
      shouldSetInitialCart: false,
    });

    expect(result.current('some_wrong_id')).toBeNull();
  });
});
