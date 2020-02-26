import ShopifyBuy from 'shopify-buy';

export const FAKE_ACCESS_TOKEN = 'access123';
export const FAKE_SHOP_NAME = 'some-shop';
export const FAKE_DOMAIN = `${FAKE_SHOP_NAME}.myshopify.com`;

export function mockBuildClient() {
  return ShopifyBuy.buildClient({
    storefrontAccessToken: FAKE_ACCESS_TOKEN,
    domain: FAKE_DOMAIN,
  });
}
