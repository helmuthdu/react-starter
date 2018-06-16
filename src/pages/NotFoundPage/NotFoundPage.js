import React from 'react';
import { hot } from 'react-hot-loader';

const NotFoundPage = () => (
  <div>
    <h1>You are here!</h1>
    <h2>But nothing found for you #404</h2>
  </div>
);

export default hot(module)(NotFoundPage);
