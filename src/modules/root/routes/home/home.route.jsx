import { push } from 'connected-react-router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { loading } from '../../../../stores/modules';
import { Home } from '../../components/home/home.component';

import './home.route.scss';

export class HomeRoute extends Component {
  componentDidMount() {
    this.props.actionToggleLoading();
  }

  render() {
    return <Home onImageClick={this.props.actionToggleLoading} onLinkClick={this.props.linkTo} />;
  }
}

HomeRoute.propTypes = {
  actionToggleLoading: PropTypes.func,
  isLoading: PropTypes.bool,
  linkTo: PropTypes.func
};

const mapStateToProps = state => ({
  isLoading: loading.getters.isLoading(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      linkTo: path => push(path),
      ...loading.actions
    },
    dispatch
  );

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(HomeRoute);
