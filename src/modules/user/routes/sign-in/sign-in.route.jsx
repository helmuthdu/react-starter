import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Subject } from 'rxjs';
import { createSearchInputFromObservable } from '../../../../utils/search.util';
import { SignIn } from '../../components/sign-in/sign-in.component';
import { user } from '../../stores';

export class SignInRoute extends Component {
  state = {
    username$: new Subject()
  };

  componentDidMount() {
    this.props.actionGetUser();
    createSearchInputFromObservable(this.state.username$, {}).subscribe((value: any) => {
      console.log('ON_CHANGE_WITH_OBSERVABLE: ', value);
    });
  }

  render() {
    return (
      <SignIn
        onSubmit={values => console.log(values)}
        onChange={this._handleChange}
        onClick={this._handleClick}
        name={this.props.name}
      />
    );
  }

  _handleClick = evt => {
    evt.preventDefault();
  };

  _handleChange = evt => {
    evt.preventDefault();
    this.state.username$.next(evt.currentTarget.value);
  };
}

SignInRoute.propTypes = {
  actionGetUser: PropTypes.func,
  actionLogin: PropTypes.func,
  actionLogout: PropTypes.func,
  linkTo: PropTypes.func,
  name: PropTypes.string
};

const mapStateToProps = state => ({ name: state.user.name });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      linkTo: () => push(`/`),
      ...user.actions
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
