import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import logo from '../../logo.svg';
import { Header, Intro, Logo, Title, Wrapper } from './HomePage.styled';

class HomePage extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <Logo src={logo} alt="logo" />
          <Title>Welcome to React</Title>
        </Header>
        <Intro>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
      </Wrapper>
    );
  }
}

export default hot(module)(HomePage);
