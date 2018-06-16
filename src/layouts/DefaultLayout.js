// @flow
import React, { Fragment, PureComponent } from 'react';
import { Route } from 'react-router-dom';

interface DefaultLayoutProps {
  children: any;
}

interface DefaultLayoutState {}

export default class DefaultLayout extends PureComponent<DefaultLayoutProps, DefaultLayoutState> {
  render() {
    // const { pathname } = this.props.children.props.location;

    return (
      <Fragment>
        <div>{this.props.children}</div>
      </Fragment>
    );
  }
}

export const DefaultLayoutRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(matchProps: DefaultLayoutProps) => (
        <DefaultLayout>
          <Component {...matchProps} />
        </DefaultLayout>
      )}
    />
  );
};
