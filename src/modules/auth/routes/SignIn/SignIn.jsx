// @flow
import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createObservableFromInput } from '../../../../helpers/observable';
import { doLogin, doLogout, getUserInfo } from '../../store/modules/auth';

type Props = {
  name: string,
  linkTo: () => void,
  doLogin: () => void,
  getUserInfo: () => void,
  doLogout: () => void
};

class SignIn extends Component<Props> {
  inputField = React.createRef();

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

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      linkTo: () => push(`/`),
      doLogin,
      getUserInfo,
      doLogout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
