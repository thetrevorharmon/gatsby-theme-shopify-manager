/** @jsx jsx */
import {jsx} from 'theme-ui';
import {Box} from 'theme-ui';

export function ExampleWithCode({element, children}) {
  return (
    <Box sx={{mt: 4, mb: 4}}>
      <Box sx={{backgroundColor: 'muted', padding: 2, paddingLeft: 4, mb: 3}}>
        {element}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}
