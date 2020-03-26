/** @jsx jsx */
import {jsx} from 'theme-ui';
import {Box, Grid} from 'theme-ui';

export function ExampleWithCode({element, children}) {
  return (
    <Box>
      <Grid columns={2} gap={0}>
        <Box sx={{backgroundColor: 'muted', padding: 2, paddingLeft: 4}}>
          {element}
        </Box>
        <Box>{children}</Box>
      </Grid>
    </Box>
  );
}
