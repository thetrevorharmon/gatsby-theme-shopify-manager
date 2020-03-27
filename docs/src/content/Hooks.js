import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import {Link} from '../components';

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
                frontmatter {
                  order
                }
                body
                tableOfContents
              }
            }
          }
        }
      }
    `,
  );

  const hooksDocumentationFiles = edges
    .map((edge) => edge.node)
    .sort((firstNode, secondNode) => {
      const firstNodeFrontmatter = firstNode.childMdx.frontmatter;
      const secondNodeFrontmatter = secondNode.childMdx.frontmatter;

      if (firstNodeFrontmatter.order > secondNodeFrontmatter.order) {
        return 1;
      }

      if (firstNodeFrontmatter.order < secondNodeFrontmatter.order) {
        return -1;
      }

      if (firstNodeFrontmatter.title > secondNodeFrontmatter.title) {
        return 1;
      }

      return -1;
    });

  return (
    <>
      <ul>
        {hooksDocumentationFiles.map((hook) => {
          const hookLink = hook.name.replace(/[^a-z]/gi, '').toLowerCase();

          return (
            <li key={hook.name}>
              <Link url={`#${hookLink}`}>{hook.name}</Link>
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
