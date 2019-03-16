import React, { Component, HTMLAttributes, Ref } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { createSearchInputObservable } from '../../../../helpers';
import { AppState } from '../../../../pages/_app';
import { auth } from '../../store';

type State = {};

type StateProps = {
  name: string;
};

type DispatchProps = auth.Actions & {};

type OwnProps = HTMLAttributes<HTMLFormElement>;

export type Props = StateProps & DispatchProps & OwnProps;

export class SignInRoute extends Component<Props, State> {
  inputField: Ref<HTMLInputElement> = React.createRef();

  componentDidMount() {
    this.props.actionGetUser();
    createSearchInputObservable(this.inputField, {}).subscribe((value: any) => {
      console.log(value);
    });
  }

  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input ref={this.inputField} type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p>current user: {this.props.name}</p>
      </form>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({ name: state.auth.name });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return bindActionCreators(
    {
      ...auth.actions
    },
    dispatch
  );
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
