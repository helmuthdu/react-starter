import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Subject } from 'rxjs';
import { createSearchInputFromObservable } from '../../../../helpers/search.helper';
import { SignIn } from '../../components/sign-in/sign-in.component';
import { auth } from '../../stores';

export class SignInRoute extends Component {
  state = {
    inputValue$: new Subject()
  };

  componentDidMount() {
    this.props.actionGetUser();
    createSearchInputFromObservable(this.state.inputValue$, {}).subscribe(value => {
      console.log(value);
    });
  }

  render() {
    return <SignIn name={this.props.name} onChange={this._handleChange} onSubmit={this._handleSubmit} />;
  }

  _handleChange = evt => {
    this.state.inputValue$.next(evt.currentTarget.value);
  };

  _handleSubmit = evt => evt.preventDefault();
}

SignInRoute.propTypes = {
  actionGetUser: PropTypes.func,
  actionLogin: PropTypes.func,
  actionLogout: PropTypes.func,
  linkTo: PropTypes.func,
  name: PropTypes.string
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
  reduxForm({ form: 'signIn' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
