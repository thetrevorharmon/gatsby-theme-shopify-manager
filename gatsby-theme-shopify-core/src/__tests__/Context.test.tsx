import React, {useContext} from 'react';
import {render} from '@testing-library/react';
import {Context} from '../Context';
import {TestHelpers} from '../utils';

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

  it('throws an error when calling the initial value for setClient', () => {
    function MockComponent() {
      const {setClient} = useContext(Context);

      try {
        setClient(TestHelpers.mockBuildClient());
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
