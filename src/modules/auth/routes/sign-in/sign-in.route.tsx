import { push } from 'connected-react-router';
import React, { Component, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { AppState } from '../../../../app';
import { createSearchInputFromObservable } from '../../../../helpers';
import { SignIn } from '../../components/sign-in/sign-in.component';
import { auth } from '../../stores';
import { reduxForm } from 'redux-form';
import { Subject } from 'rxjs';

type StateProps = Readonly<{
  name: string;
}>;

type DispatchProps = auth.Actions & {
  linkTo: () => void;
};

type OwnProps = HTMLAttributes<HTMLFormElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{
  inputValue: Subject<string>;
}>;

export class SignInRoute extends Component<Props, State> {
  public state = {
    inputValue: new Subject<string>()
  };

  public componentDidMount() {
    this.props.actionGetUser();
    createSearchInputFromObservable(this.state.inputValue, {}).subscribe((value: any) => {
      console.log('ON_CHANGE_WITH_OBSERVABLE: ', value);
    });
  }

  public render() {
    return (
      <SignIn
        onSubmit={e => e.preventDefault()}
        onChange={this.handleChange}
        onClick={this.handleClick}
        name={this.props.name}
      />
    );
  }

  private handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
  };

  private handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.state.inputValue.next(evt.currentTarget.value);
  };
}

const mapStateToProps = (state: AppState): StateProps => ({ name: state.auth.name });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return bindActionCreators(
    {
      linkTo: () => push(`/`),
      ...auth.actions
    },
    dispatch
  );
};

const enhance = compose<React.ComponentClass<OwnProps>>(
  reduxForm({ form: 'signIn' }),
  connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
