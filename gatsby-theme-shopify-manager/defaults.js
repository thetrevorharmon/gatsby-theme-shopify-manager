// got this pattern/idea from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog-core/gatsby-config.js
module.exports = (themeOptions) => {
  const shouldConfigureSourcePlugin =
    themeOptions.shouldConfigureSourcePlugin != null
      ? themeOptions.shouldConfigureSourcePlugin
      : true;

  const shouldWrapRootElementWithProvider =
    themeOptions.shouldWrapRootElementWithProvider != null
      ? themeOptions.shouldWrapRootElementWithProvider
      : true;

  const shopName = themeOptions.shopName || null;
  const accessToken = themeOptions.accessToken || null;

  return {
    shouldConfigureSourcePlugin,
    shouldWrapRootElementWithProvider,
    shopName,
    accessToken,
  };
};
