import React from 'react';
import {render} from '@testing-library/react';
import {ContextOptions} from './types';
import {wrapWithContext} from './wrapWithContext';

export function renderWithContext(
  component: React.ReactNode,
  givenOptions?: Partial<ContextOptions>,
) {
  const wrapperFunction = wrapWithContext(givenOptions);
  return render(wrapperFunction({children: component}));
}
