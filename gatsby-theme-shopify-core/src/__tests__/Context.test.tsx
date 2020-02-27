import React, {useContext} from 'react';
import {render} from '@testing-library/react';
import {Context} from '../Context';

describe('Context', () => {
  it('returns undefined as the default value for the client', () => {
    function MockComponent() {
      const {client} = useContext(Context);
      const content = client === undefined ? 'pass' : 'fail';

      return <p>{content}</p>;
    }

    const {getAllByText} = render(<MockComponent />);
    expect(getAllByText('pass')).toBeTruthy();
  });

  it('returns undefined as the default value for the cart', () => {
    function MockComponent() {
      const {cart} = useContext(Context);
      const content = cart === undefined ? 'pass' : 'fail';

      return <p>{content}</p>;
    }

    const {getAllByText} = render(<MockComponent />);
    expect(getAllByText('pass')).toBeTruthy();
  });

  it('throws an error when calling the initial value for setCart', () => {
    function MockComponent() {
      const {setCart} = useContext(Context);

      try {
        setCart(undefined);
      } catch (error) {
        return <p>{error.message}</p>;
      }

      return <p>fail</p>;
    }

    const {getAllByText} = render(<MockComponent />);
    expect(
      getAllByText('You forgot to wrap this in a Provider object'),
    ).toBeTruthy();
  });
});
