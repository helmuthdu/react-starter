import _ from 'lodash';
import { barplot, bench, run, summary } from 'mitata';
import { map } from '../array/map';
import { getListOfNumbers } from './_utils';

const DATA = getListOfNumbers(1000);

barplot(() => {
  summary(() => {
    bench('native', function* () {
      yield () => DATA.map((val) => val * 2);
    });
    bench('superdash', function* () {
      yield () => map(DATA, (val) => val * 2);
    });
    bench('lodash', function* () {
      yield () => _.map(DATA, (val) => val * 2);
    });
  });
});

await run();
