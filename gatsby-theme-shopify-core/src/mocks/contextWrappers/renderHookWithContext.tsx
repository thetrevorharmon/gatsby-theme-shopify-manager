import {
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react-hooks';
import {wrapWithContext} from './wrapWithContext';
import {ContextOptions} from './types';

// this type signature matches renderHook's type signature
export function renderHookWithContext<P, R>(
  callback: (props: P) => R,
  contextOptions?: Partial<ContextOptions>,
  renderHookOptions?: RenderHookOptions<P>,
): RenderHookResult<P, R> {
  return renderHook(callback, {
    ...renderHookOptions,
    wrapper: wrapWithContext(contextOptions),
  });
}
