import React from 'react';
import {render} from '@testing-library/react';
import {useCoreOptions} from '../useCoreOptions';
import {CoreOptions} from '../types';
import {useStaticQuery} from 'gatsby';

const mockAccessToken = 'THIS_IS_MY_ACCESS_TOKEN';
const mockShopName = 'fake-shop';

beforeEach(() => {
  (useStaticQuery as jest.Mock<{
    coreOptions: CoreOptions;
  }>).mockImplementationOnce(() => ({
    coreOptions: {
      accessToken: mockAccessToken,
      shopName: mockShopName,
    },
  }));
});

describe('useCoreOptions()', () => {
  it('returns a shopName', () => {
    function MockComponent() {
      const {shopName} = useCoreOptions();
      return <p>{shopName}</p>;
    }

    const wrapper = render(<MockComponent />);

    expect(wrapper.getByText(mockShopName)).toHaveTextContent(mockShopName);
  });

  it('returns an accessToken', () => {
    function MockComponent() {
      const {accessToken} = useCoreOptions();
      return <p>{accessToken}</p>;
    }

    const wrapper = render(<MockComponent />);

    expect(wrapper.getByText(mockAccessToken)).toHaveTextContent(
      mockAccessToken,
    );
  });
});
