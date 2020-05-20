/** @jsx jsx */
import {Styled, jsx, Box} from 'theme-ui';
import {Layout, Link} from '../components';

function ErrorPage() {
  return (
    <Box sx={{minHeight: '100%', background: 'green'}}>
      <Layout>
        <Box sx={{py: 6, minHeight: '100%'}}>
          <Styled.h1>Darn!</Styled.h1>
          <Styled.p>Looks like you found a bad link.</Styled.p>
          <Link url="/">Go Home</Link>
        </Box>
      </Layout>
    </Box>
  );
}

export default ErrorPage;
