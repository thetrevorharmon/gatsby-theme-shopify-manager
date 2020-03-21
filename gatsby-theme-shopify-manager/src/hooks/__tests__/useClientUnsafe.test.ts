import {renderHook} from '@testing-library/react-hooks';
import {Mocks, renderHookWithContext} from '../../mocks';
import {useClientUnsafe} from '../useClientUnsafe';

describe('useClientUnsafe()', () => {
  it('returns the client object', async () => {
    const {result} = await renderHookWithContext(() => useClientUnsafe());
    expect(result.current).toBe(Mocks.CLIENT);
  });

  it('returns null if it is not wrapped in a provider', async () => {
    const {result} = renderHook(() => useClientUnsafe());
    expect(result.current).toBeNull();
  });
});
