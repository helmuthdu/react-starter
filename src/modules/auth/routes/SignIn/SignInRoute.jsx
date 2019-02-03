import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createSearchInputObservable } from '../../../../helpers/search.helper';
import { auth } from '../../store';

export class SignInRoute extends Component {
  inputField = React.createRef();

  componentDidMount() {
    this.props.getUser();
    createSearchInputObservable(this.inputField, {}).subscribe(value => {
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

SignInRoute.propTypes = {
  name: PropTypes.string,
  linkTo: PropTypes.func,
  doLogin: PropTypes.func,
  getUser: PropTypes.func,
  doLogout: PropTypes.func
};

const mapStateToProps = state => ({ name: state.auth.name });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      linkTo: () => push(`/`),
      ...auth.actions
    },
    dispatch
  );

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
