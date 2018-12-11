// @flow
import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doLogin, doLogout, getUserInfo } from '../../store';
import { createObservableFromInput } from '../../../../helpers/observable';

type Props = {
  name: string
};

class SignIn extends Component<Props> {
  inputField = React.createRef();

  componentDidMount(): void {
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
      changePage: () => push(`/`),
      doLogin,
      getUserInfo,
      doLogout
    },
    dispatch
  );

// Request initial data for the component
const beforeMount = async props => await props.getUserInfo();

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(frontloadConnect(beforeMount)(SignIn));
