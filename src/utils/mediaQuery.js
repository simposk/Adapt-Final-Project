import { lifecycle } from 'recompose';

const mediaQueries = {};

export function mediaQuery({
  query = '',
  full = false,
  onChange = () => {},
} = {}) {
  const result = {
    query,
    full,
    queryMatches: false,
    _mq: null,
  };

  if (!query) {
    return result;
  }

  function listener(mq) {
    result.queryMatches = mq.matches;
    onChange(result.queryMatches);
  }
  function removeListener() {
    result._mq.removeListener(listener);
  }

  result.query = !full && query[query.length - 1] !== ')' ? `(${query})` : query;

  if (!mediaQueries[result.query]) {
    mediaQueries[result.query] = window.matchMedia(result.query);
  }

  result._mq = mediaQueries[result.query];
  result.queryMatches = result._mq.matches;
  result.removeListener = removeListener;
  result._mq.addListener(listener);

  return result;
}

export function mediaQueryMapper({
  queries = [],
  valueKey = 'value',
  defaultValue = '',
  onChange = () => {},
} = {}) {
  const mQs = queries.map(query => mediaQuery({
    query: query.query,
    full: query.full,
    onChange: onMqChange,
  }));

  function getValue() {
    let value = defaultValue;
    mQs.forEach((mQ, i) => {
      if (mQ.queryMatches) {
        value = queries[i][valueKey];
      }
    });
    return value;
  }

  function onMqChange() {
    onChange(getValue());
  }

  function removeListeners() {
    mQs.forEach((mq) => {
      mq && mq.removeListener && mq.removeListener();
    });
  }

  return { getValue, removeListeners };
}

export const MediaQuery = (options) => lifecycle({
  state: { columns: options.columns, matches: false },
  componentDidMount() {
    const setColumns = () => {
      this.setState(() => ({
        columns: this._columns.getValue(),
      }));
    };

    const setMatches = () => {
      this.setState(() => ({
        matches: this._matches.getValue(),
      }));
    };

    if (this._columns) {
      this._columns.removeListeners();
    }

    if (this._matches) {
      this._matches.removeListeners();
    }

    this._columns = mediaQueryMapper({
      queries: options,
      valueKey: 'columns',
      defaultValue: 1,
      onChange: setColumns.bind(this),
    });

    this._matches = mediaQueryMapper({
      queries: options.map((option) => ({ ...option, matches: true })),
      valueKey: 'matches',
      defaultValue: false,
      onChange: setMatches.bind(this),
    });

    setColumns();
    setMatches();
  },
  componentWillUnmount() {
    if (this._columns) {
      this._columns.removeListeners();
    }

    if (this._matches) {
      this._matches.removeListeners();
    }
  },
});
