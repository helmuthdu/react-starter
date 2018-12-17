// @flow
import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleLoading } from '../../../../store/modules/ui';
import { isLoading } from '../../../../store/modules/ui/getters';
import { AUTH_ROUTES } from '../../../auth/router';
import logo from '../../assets/images/logo.svg';
import { MAIN_ROUTES } from '../../router';
import { Button, Header, Intro, Logo, Title, Wrapper } from './HomePage.styled';

type Props = {
  isLoading: boolean,
  toggleLoading: () => void,
  changePage: (path: string) => void
};

export class HomePage extends Component<Props> {
  async componentDidMount() {
    await new Promise((resolve, reject) => {
      console.log('Before mounting HomePage component', this.props);
      return resolve();
    });
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
        <Button onClick={() => this.props.changePage(MAIN_ROUTES.ABOUT)} title="go to about page">
          about page
        </Button>
        or to
        <Button onClick={() => this.props.changePage(AUTH_ROUTES.SIGN_IN)} title="go to sign-in page">
          sign-in page
        </Button>
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
      changePage: path => push(path)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
