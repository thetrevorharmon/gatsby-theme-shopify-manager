/** @jsx jsx */
import {jsx} from 'theme-ui';
import {Box} from 'theme-ui';
import {ControlStrip} from '../components';

export function ExampleWithCode({element, children}) {
  return (
    <Box sx={{mt: 4, mb: 4}}>
      <Box sx={{backgroundColor: 'white', padding: 3, paddingLeft: 4}}>
        {element}
      </Box>
      <ControlStrip />
      <Box sx={{mt: 3}}>{children}</Box>
    </Box>
  );
}
