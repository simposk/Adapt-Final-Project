export const TWO_COLUMNS_LAYOUTS = [
  {
    columns: 2,
    query: 'min-width: 960px',
    styles: [{ width: '50%' }, { width: '50%' }],
  },
  {
    columns: 2,
    query: 'min-width: 1200px',
    styles: [{ width: '40%' }, { width: '60%' }],
  },
];

export const TWO_COLUMNS_60_40_LAYOUT = [
  {
    columns: 2,
    query: 'min-width: 960px',
    styles: [{ width: '60%' }, { width: '40%' }],
  },
];

export const THREE_COLUMNS_EQUAL_LAYOUT = [
  {
    columns: 3,
    query: 'min-width: 960px',
    styles: [{ width: 'calc(100% / 3)' }, { width: 'calc(100% / 3)' }, { width: 'calc(100% / 3)' }],
  },
];
