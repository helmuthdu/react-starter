import { push } from 'connected-react-router';
import React, { Component, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { AppState } from '../../../../app';
import { loading } from '../../../../stores/modules';
import { Home } from '../../components/home/home.component';

import './home.route.scss';

type StateProps = Readonly<{
  isLoading: boolean;
}>;

type DispatchProps = loading.Actions & {
  linkTo: (path: string) => void;
};

type OwnProps = HTMLAttributes<HTMLDivElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{}>;

export class HomeRoute extends Component<Props, State> {
  public componentDidMount() {
    this.props.actionToggleLoading();

    return new Promise((resolve, reject) => {
      console.log('Before mounting HomePage component', this.props);
      return resolve();
    });
  }

  public render() {
    return <Home onImageClick={this.props.actionToggleLoading} onLinkClick={this.props.linkTo} />;
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  isLoading: loading.selectors.isLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      linkTo: path => push(path),
      ...loading.actions
    },
    dispatch
  );

const enhance = compose<React.ComponentClass<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HomeRoute);
