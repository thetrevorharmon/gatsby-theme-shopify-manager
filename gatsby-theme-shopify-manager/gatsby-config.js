// eslint-disable-next-line @typescript-eslint/no-var-requires
const withDefaults = require(`./defaults`);

module.exports = (themeOptions) => {
  const options = withDefaults(themeOptions);
  const {
    shouldIncludeSourcePlugin,
    shouldWrapRootElementWithProvider,
    shopName,
    accessToken,
  } = options;

  const needsApiInformation =
    shouldIncludeSourcePlugin === true ||
    shouldWrapRootElementWithProvider === true;
  const missingApiInformation = shopName == null || accessToken == null;

  if (needsApiInformation && missingApiInformation) {
    throw new Error(
      'gatsby-theme-shopify-manager: You forgot to pass in a shopName or accessToken to the theme options',
    );
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
