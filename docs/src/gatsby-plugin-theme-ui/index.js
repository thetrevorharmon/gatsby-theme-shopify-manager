import {base} from '@theme-ui/presets';

export default {
  ...base,
  styles: {
    ...base.styles,
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
      color: 'text',
      bg: 'muted',
      border: '1px solid',
    },
  },
};
