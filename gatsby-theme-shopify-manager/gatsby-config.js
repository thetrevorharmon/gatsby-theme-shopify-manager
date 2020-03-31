// eslint-disable-next-line @typescript-eslint/no-var-requires
const withDefaults = require(`./defaults`);

module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions);
  const {shouldIncludeSourcePlugin, shopName, accessToken} = options;

  if (shouldIncludeSourcePlugin && (shopName == null || accessToken == null)) {
    throw new Error('You forgot to provide a shopName and/or accessToken');
  }

  const shopifySourcePlugin = shouldIncludeSourcePlugin
    ? {
        resolve: `gatsby-source-shopify`,
        options: {
          shopName,
          accessToken,
        },
      }
    : null;

  const plugins = ['gatsby-plugin-typescript', shopifySourcePlugin].filter(
    Boolean,
  );

  return {
    plugins,
  };
};
