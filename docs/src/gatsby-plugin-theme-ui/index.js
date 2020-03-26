import {base} from '@theme-ui/presets';

export default {
  ...base,
  styles: {
    ...base.styles,
    root: {
      ...base.styles.root,
      maxWidth: 700,
      margin: '0 auto',
    },
    h1: {
      letterSpacing: -2,
      mt: 5,
      mb: 3,
    },
    h2: {
      letterSpacing: -1,
      mt: 5,
      mb: 3,
    },
    h3: {
      letterSpacing: -0.5,
      mt: 4,
      mb: 2,
    },
    td: {
      borderBottom: '1px dashed',
      pt: 2,
      pb: 2,
    },
  },
  cards: {
    ...base.cards,
    primary: {
      border: '1px solid',
    },
  },
  alerts: {
    ...base.alerts,
    callout: {
      color: '#555',
      bg: 'muted',
      border: '1px solid #aaa',
    },
  },
  buttons: {
    primary: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
};
