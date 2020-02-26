module.exports = (themeOptions) => {
  if (themeOptions.shopName == null || themeOptions.accessToken == null) {
    throw new Error('You forgot to provide a shopName and/or accessToken');
  }

  return {
    plugins: [
      'gatsby-plugin-typescript',
      {
        resolve: `gatsby-source-shopify`,
        options: {
          shopName: themeOptions.shopName,
          accessToken: themeOptions.accessToken,
        },
      },
    ],
  };
};
