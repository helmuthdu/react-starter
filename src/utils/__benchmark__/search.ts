import { barplot, bench, run, summary } from 'mitata';
import { search } from '../array/search';
import { getListOfObjects } from './_utils';

const DATA = getListOfObjects(1000);

barplot(() => {
  summary(() => {
    bench('superdash', function* () {
      yield () => search(DATA, '1234', 0.5);
    });
  });
});

await run();
