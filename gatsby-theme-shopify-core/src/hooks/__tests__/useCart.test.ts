import {renderHook} from '@testing-library/react-hooks';
import {Mocks, renderHookWithContext} from '../../mocks';
import {useCart} from '../useCart';

describe('useCart()', () => {
  it('returns the cart object', async () => {
    const {result} = await renderHookWithContext(() => useCart());
    expect(result.current).toBe(Mocks.CART);
  });

  it('returns null if it is not wrapped in a provider', async () => {
    const {result} = renderHook(() => useCart());
    expect(result.current).toBeNull();
  });
});
