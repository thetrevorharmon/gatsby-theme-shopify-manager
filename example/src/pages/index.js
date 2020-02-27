import React from 'react';
import {useClient} from 'gatsby-theme-shopify-core';

function IndexPage() {
  const client = useClient();
  console.log(client);

  const name = client != null ? client.config.domain : 'Broken!';

  return <h1>Hello! Your domain is {name}</h1>;
}

export default IndexPage;
