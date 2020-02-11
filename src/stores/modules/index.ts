import * as loading from './loading';
import * as locale from './locale';
import * as notification from './notification';

export type State = Readonly<{
  loading: loading.State;
  locale: locale.State;
  notification: notification.State;
}>;

export const stores = [loading, locale, notification];

export { loading, locale, notification };
