import { push } from 'connected-react-router';
import React, { Component, HTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { AppState } from '../../../../app';
import { createSearchInputObservable } from '../../../../helpers';
import { SignIn } from '../../components/sign-in/sign-in.component';
import { auth } from '../../stores';

type StateProps = Readonly<{
  name: string;
}>;

type DispatchProps = auth.Actions & {
  linkTo: () => void;
};

type OwnProps = HTMLAttributes<HTMLFormElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{}>;

export class SignInRoute extends Component<Props, State> {
  private inputField: React.RefObject<HTMLInputElement> = React.createRef();

  public componentDidMount() {
    this.props.actionGetUser();
    createSearchInputObservable(this.inputField, {}).subscribe((value: any) => {
      console.log('ON_CHANGE_WITH_OBSERVABLE: ', value);
    });
  }

  public render() {
    return (
      <SignIn
        onSubmit={e => e.preventDefault()}
        ref={this.inputField}
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
    console.log('ON_CHANGE: ', evt.currentTarget.value);
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
  connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
