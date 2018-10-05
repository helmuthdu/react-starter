// @flow
import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doLogin, doLogout } from '../../store';

class SignIn extends Component {
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push(`/`),
      doLogin,
      doLogout
    },
    dispatch
  );

// Request initial data for the component
const loadRequest = async props =>
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('LOAD_COMPLETED');
      resolve();
    }, 1000);
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(frontloadConnect(loadRequest)(SignIn));
