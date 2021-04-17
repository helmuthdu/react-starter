import React, { useCallback } from 'react';
import { RouteProps, Switch } from 'react-router-dom';
import { useStore } from '../../../stores';

export const I18nSwitch: React.FC = ({ children }) => {
  const [
    {
      locale: { language }
    }
  ] = useStore();

  const updateRoutePath = useCallback(
    (path: string | readonly string[] | undefined) => {
      switch (typeof path) {
        case 'undefined':
          return undefined;
        case 'object':
          return path.map(key => `/${language}/${key}`);
        default:
          const isFallbackRoute = path === '*';
          return isFallbackRoute ? path : `/${language}/${path}`;
      }
    },
    [language]
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
