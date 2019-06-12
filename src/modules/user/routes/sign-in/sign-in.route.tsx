import * as React from 'react';
import { Component, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { reduxForm } from 'redux-form';
import { Subject } from 'rxjs';
import { createSearchInputFromObservable } from '../../../../helpers';
import { AppState } from '../../../../pages/_app';
import { SignIn } from '../../components/sign-in/sign-in.component';
import { user } from '../../stores';

type StateProps = Readonly<{
  name: string;
}>;

type DispatchProps = user.Actions;

type OwnProps = HTMLAttributes<HTMLFormElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{
  username$: Subject<string>;
}>;

class SignInRoute extends Component<Props, State> {
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
    this.state.username$.next(evt.currentTarget.value);
  };
}

const mapStateToProps = (state: AppState): StateProps => ({ name: state.user.name });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return bindActionCreators(
    {
      ...user.actions
    },
    dispatch
  );
};

const enhance = compose<React.FunctionComponent<OwnProps>>(
  reduxForm({ form: 'signIn' }),
  connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
