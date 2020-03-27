/** @jsx jsx */
import {jsx, Link as ThemeUiLink} from 'theme-ui';
import {Link as GatsbyLink} from 'gatsby';

const EXTERNAL_URL_PATTERN = /^http/;

export function Link({url, children, ...rest}) {
  const isExternalUrl = EXTERNAL_URL_PATTERN.test(url);

  if (isExternalUrl) {
    return (
      <ThemeUiLink href={url} {...rest}>
        {children}
      </ThemeUiLink>
    );
  } else {
    return (
      <ThemeUiLink as={GatsbyLink} to={url} {...rest}>
        {children}
      </ThemeUiLink>
    );
  }
}
