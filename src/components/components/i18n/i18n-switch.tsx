import React, { useCallback } from 'react';
import { RouteProps, Switch } from 'react-router-dom';
import { useStorage } from '../../../hooks/storage.hook';
import { LocaleMessages, LocaleStorageID } from './i18n';

export const I18nSwitch: React.FC = ({ children }) => {
  const [{ locale }] = useStorage<LocaleMessages>(LocaleStorageID);

  const updateRoutePath = useCallback(
    (path: string | readonly string[] | undefined) => {
      switch (typeof path) {
        case 'undefined':
          return undefined;
        case 'object':
          return path.map(key => `/${locale}/${key}`);
        default:
          const isFallbackRoute = path === '*';
          return isFallbackRoute ? path : `/${locale}/${path}`;
      }
    },
    [locale]
  );

  return (
    <Switch>
      {React.Children.map(children, child =>
        React.isValidElement<RouteProps>(child)
          ? React.cloneElement(child, { ...child.props, path: updateRoutePath(child.props.path) })
          : child
      )}
    </Switch>
  );
};
