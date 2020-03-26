import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import {Link} from 'gatsby';

export function Hooks() {
  const {
    allFile: {edges},
  } = useStaticQuery(
    graphql`
      query HooksDocumentationFiles {
        allFile(filter: {sourceInstanceName: {eq: "hooks"}}) {
          edges {
            node {
              name
              childMdx {
                body
                tableOfContents
              }
            }
          }
        }
      }
    `,
  );

  const hooksDocumentationFiles = edges.map((edge) => edge.node);

  return (
    <>
      <ul>
        {hooksDocumentationFiles.map((hook) => {
          const hookLink = hook.name.replace(/[^a-z]/gi, '').toLowerCase();

          return (
            <li key={hook.name}>
              <Link to={`#${hookLink}`}>{hook.name}</Link>
            </li>
          );
        })}
      </ul>
      {hooksDocumentationFiles.map((hook) => {
        return <MDXRenderer key={hook.name}>{hook.childMdx.body}</MDXRenderer>;
      })}
    </>
  );
}
