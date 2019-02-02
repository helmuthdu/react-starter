import { push } from 'connected-react-router';
import React, { Component, HTMLAttributes, Ref } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { createObservableFromInput } from '../../../../helpers/observable';
import { AppState } from '../../../../index';
import { AuthenticatePayload } from '../../api/auth.api';
import { doLogin, doLogout, getUserData } from '../../store/modules/auth';

type State = {};

type StateProps = {
  name: string;
};

type DispatchProps = {
  linkTo: () => void;
  doLogin: (payload: AuthenticatePayload) => void;
  getUserInfo: () => void;
  doLogout: () => void;
};

type OwnProps = HTMLAttributes<HTMLFormElement>;

export type Props = StateProps & DispatchProps & OwnProps;

export class SignInRoute extends Component<Props, State> {
  inputField: Ref<HTMLInputElement> = React.createRef();

  async componentDidMount() {
    await this.props.getUserInfo();
    createObservableFromInput(this.inputField, {}).subscribe((value: any) => {
      console.log(value);
    });
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input ref={this.inputField} type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p>current user: {this.props.name}</p>
      </form>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({ name: state.auth.name });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      linkTo: () => push(`/`),
      doLogin,
      getUserInfo: getUserData,
      doLogout
    },
    dispatch
  );

const enhance = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
