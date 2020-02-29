const shopifyBuy = jest.requireActual('shopify-buy');
const MocksFolder = require('../../gatsby-theme-shopify-core/src/mocks');

shopifyBuy.buildClient = ({storefrontAccessToken, domain}) => {
  if (storefrontAccessToken == null) {
    throw new Error('new Config() requires the option storefrontAccessToken');
  }

  if (domain == null) {
    throw new Error('new Config() requires the option domain');
  }

  return MocksFolder.Mocks.CLIENT;
};

export default shopifyBuy;
