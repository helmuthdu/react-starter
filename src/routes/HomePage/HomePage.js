// @flow
import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { frontloadConnect } from 'react-frontload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../../assets/images/logo.svg';
import { toggleLoading } from '../../store/modules/ui';
import { isLoading } from '../../store/modules/ui/getters';
import { Header, Intro, Logo, Title, Wrapper } from './HomePage.styled';

interface HomeProps {
  isLoading: boolean;
  toggleLoading: Function;
  changePage: Function;
}

interface HomeState {}

export class HomePage extends Component<HomeProps, HomeState> {
  componentDidMount() {
    this.props.toggleLoading();
  }

  render() {
    return (
      <Wrapper>
        <Header onClick={this.props.toggleLoading}>
          <Logo src={logo} alt="logo" isLoading={this.props.isLoading} />
          <Title>Welcome to React</Title>
        </Header>
        <Intro>
          To get started, edit <code>src/index.js</code> and save to reload.
        </Intro>
        Navigate to
        <button onClick={this.props.changePage} title="go to about page">
          about page
        </button>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: isLoading(state.ui)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleLoading,
      changePage: () => push('/about')
    },
    dispatch
  );

// Request initial data for the component
const asyncData = async props => await new Promise((resolve, reject) => resolve());

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(frontloadConnect(asyncData)(HomePage));
