const shopifyBuy = jest.requireActual('shopify-buy');
const TestHelpers = require('../../gatsby-theme-shopify-core/src/utils/TestHelpers');

shopifyBuy.buildClient = ({storefrontAccessToken, domain}) => {
  if (storefrontAccessToken == null) {
    throw new Error('new Config() requires the option storefrontAccessToken');
  }

  if (domain == null) {
    throw new Error('new Config() requires the option domain');
  }

  return TestHelpers.MOCK_CLIENT;
};

export default shopifyBuy;
