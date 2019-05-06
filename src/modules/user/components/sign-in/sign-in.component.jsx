import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'redux-form';

export const SignIn = props => (
  <form onSubmit={props.onSubmit}>
    <Field component="input" type="text" placeholder="Username" name="username" required onChange={props.onChange} />
    <Field component="input" type="password" placeholder="Password" name="password" required />
    <button type="submit">Login</button>
    <p>current user: {props.name}</p>
  </form>
);

SignIn.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
