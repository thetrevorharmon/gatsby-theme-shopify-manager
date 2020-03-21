/*
  In order to access user options throughout the app, we have to
  add them as a node within the Graphql.

  This creates a type called "CoreOptions" on the GraphQL schema.
*/
exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions;
  createTypes(`type
    CoreOptions implements Node {
      shopName: String
      accessToken: String
    }`);
};

/*
  In order to access user options throughout the app, we have to
  add them as a node within the Graphql.

  This takes options passed in to a child's gatsby-config and creates
  a node for them.

  Further reading:
  • https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
  • https://www.christopherbiscardi.com/post/applying-theme-options-using-custom-configuration-nodes/
  • https://www.erichowey.dev/writing/examples-of-using-options-in-gatsby-themes/
*/
exports.sourceNodes = (
  {actions: {createNode}, createContentDigest},
  {shopName = ``, accessToken = ``},
) => {
  const coreOptions = {
    shopName,
    accessToken,
  };

  createNode({
    ...coreOptions,
    id: `gatsby-theme-shopify-manager`,
    parent: null,
    children: [],
    internal: {
      description: `Core Options`,
      type: `CoreOptions`,
      content: JSON.stringify(coreOptions),
      contentDigest: createContentDigest(JSON.stringify(coreOptions)),
    },
  });
};
