import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createSearchInputObservable } from '../../../../helpers/search.helper';
import { auth } from '../../stores';
import { SignIn } from '../../components/sign-in/sign-in.component';

export class SignInRoute extends Component {
  inputField = React.createRef();

  componentDidMount() {
    this.props.actionGetUser();
    createSearchInputObservable(this.inputField, {}).subscribe(value => {
      console.log(value);
    });
  }

  render() {
    return <SignIn ref={this.inputField} name={this.props.name} onSubmit={e => e.preventDefault()} />;
  }
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
