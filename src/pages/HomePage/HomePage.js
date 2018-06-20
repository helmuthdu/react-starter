// @flow
import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../../logo.svg';
import { toggleLoading } from '../../store/modules/ui';
import { isLoading } from '../../store/modules/ui/getters';
import { Header, Intro, Logo, Title, Wrapper } from './HomePage.styled';

interface HomePageProps {
  isLoading: boolean;
  toggleLoading: Function;
  changePage: Function;
}

interface HomePageState {}

export class HomePage extends Component<HomePageProps, HomePageState> {
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
        <strong onClick={this.props.changePage} title="go to about page">
          about page
        </strong>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
