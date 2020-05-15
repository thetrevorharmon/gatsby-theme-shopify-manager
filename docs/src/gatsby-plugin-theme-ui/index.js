export default {
  breakpoints: ['28em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 20, 26, 32, 40],
  fontWeights: {
    body: 400,
    heading: 800,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    background: '#F3F0EB',
    backgroundDarker: '#d8cfaf',
    heading: '#A66C00',
    text: '#353535',
    primary: '#FFCF77',
    secondary: '#48B3F4',
    muted: '#f6f6f6',
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      color: 'heading',
    },
  },
  styles: {
    root: {
      fontSize: '18px',
      color: 'text',
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      overflow: 'hidden',
      backgroundColor: 'background',
    },
    h1: {
      variant: 'text.heading',
      fontSize: [4, 5],
      color: 'black',
    },
    h2: {
      variant: 'text.heading',
      fontSize: [3, 4],
      mt: 6,
      mb: 3,
    },
    h3: {
      variant: 'text.heading',
      fontSize: [2, 3],
      mt: 5,
      mb: 3,
    },
    h4: {
      variant: 'text.heading',
      mt: 4,
      mb: 2,
      fontSize: 2,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    a: {
      color: 'heading',
    },
    table: {
      mt: 4,
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
      pr: 3,
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
      borderBottom: '1px solid #aaa',
      p: 2,
      pl: 0,
      pr: 3,
    },
    blockquote: {
      backgroundColor: 'primary',
      position: 'relative',
      margin: 0,
      padding: 3,
      p: {
        margin: 0,
        padding: 0,
      },
      '::before': {
        content: '""',
        display: 'block',
        borderLeft: '1rem solid transparent',
        borderRight: '1rem solid',
        borderRightColor: 'background',
        borderTop: '1rem solid transparent',
        height: 0,
        width: 0,
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: 2,
      },
    },
  },
  alerts: {
    callout: {
      color: '#555',
      bg: 'muted',
      border: '1px solid #aaa',
    },
  },
  buttons: {
    primary: {
      color: 'text',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    controlStrip: {
      fontSize: 1,
      px: 2,
      py: 1,
      fontWeight: 600,
      backgroundColor: 'secondary',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  cards: {
    primary: {
      overflow: 'hidden',
      background: 'white',
      padding: 0,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },
  },
  forms: {
    input: {
      border: 'none',
      backgroundColor: 'background',
    },
  },
};
