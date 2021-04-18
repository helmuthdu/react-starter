import React, { useCallback } from 'react';
import { RouteProps, Switch } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { localeState } from '../../../stores/locale.store';

export const I18nSwitch: React.FC = ({ children }) => {
  const [{ locale }] = useRecoilState(localeState);

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
