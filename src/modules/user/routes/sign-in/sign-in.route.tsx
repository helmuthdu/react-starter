import { push } from 'connected-react-router';
import React, { Component, HTMLAttributes, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { Subject } from 'rxjs';
import { AppState } from '../../../../app';
import { createSearchInputFromObservable } from '../../../../helpers';
import { SignIn } from '../../components/sign-in/sign-in.component';
import { user } from '../../stores';

type StateProps = Readonly<{
  name: string;
}>;

type DispatchProps = user.Actions & {
  linkTo: () => void;
};

type OwnProps = HTMLAttributes<HTMLFormElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{
  username$: Subject<string>;
}>;

export class SignInRoute extends Component<Props, State> {
  public state: State = {
    username$: new Subject<string>()
  };

  public componentDidMount() {
    this.props.actionGetUser();
    createSearchInputFromObservable(this.state.username$, {}).subscribe((value: any) => {
      console.log('ON_CHANGE_WITH_OBSERVABLE: ', value);
    });
  }

  public render() {
    return (
      <SignIn
        onSubmit={values => console.log(values)}
        onChange={this.handleChange}
        onClick={this.handleClick}
        name={this.props.name}
      />
    );
  }

  private handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
  };

  private handleChange = (evt: SyntheticEvent) => {
    evt.preventDefault();
    // @ts-ignore
    this.state.username$.next(evt.currentTarget.value);
  };
}

const mapStateToProps = (state: AppState): StateProps => ({ name: state.user.name });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return bindActionCreators(
    {
      linkTo: () => push(`/`),
      ...user.actions
    },
    dispatch
  );
};

const enhance = compose<React.FunctionComponent<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
