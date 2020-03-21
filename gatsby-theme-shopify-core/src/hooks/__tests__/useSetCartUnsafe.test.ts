import {renderHook, act} from '@testing-library/react-hooks';
import {Mocks, renderHookWithContext} from '../../mocks';
import {LocalStorage, LocalStorageKeys} from '../../utils';
import {useSetCartUnsafe} from '../useSetCartUnsafe';

describe('useSetCartUnsafe()', () => {
  it('returns a function to set the cart in state', async () => {
    const localStorageSpy = jest.spyOn(LocalStorage, 'set');
    const {result} = await renderHookWithContext(() => useSetCartUnsafe());

    const newCart = {...Mocks.CART, id: 'my_new_cart'};
    act(() => {
      // @ts-ignore
      result.current(newCart);
    });

    expect(localStorageSpy).toHaveBeenCalledWith(
      LocalStorageKeys.CART,
      JSON.stringify(newCart),
    );
  });

  it('throws an error if a given variant Id is not found in the cart', async () => {
    const {result} = renderHook(() => useSetCartUnsafe());

    // @ts-ignore
    expect(() => result.current(Mocks.CART)).toThrow(
      'You forgot to wrap this in a Provider object',
    );
  });
});
