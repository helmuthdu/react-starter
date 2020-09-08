import * as locale from './locale';
import * as notification from './notification';

export type State = Readonly<{
  locale: locale.State;
  notification: notification.State;
}>;

export const stores = [locale, notification];

export { locale, notification };
