import React from 'react';
import PropTypes from 'prop-types';

export const SignIn = props => (
  <form onSubmit={props.onSubmit}>
    <input ref={props.ref} type="text" placeholder="Username" required />
    <input type="password" placeholder="Password" required />
    <button type="submit">Login</button>
    <p>current user: {props.name}</p>
  </form>
);

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  name: PropTypes.string.isRequired
};
