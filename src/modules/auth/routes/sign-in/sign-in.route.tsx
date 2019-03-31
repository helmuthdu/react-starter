import { push } from 'connected-react-router';
import React, { Component, HTMLAttributes, Ref } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { createSearchInputObservable } from '../../../../helpers';
import { AppState } from '../../../../modules';
import { auth } from '../../store';

type StateProps = Readonly<{
  name: string;
}>;

type DispatchProps = auth.Actions & {
  linkTo: () => void;
};

type OwnProps = HTMLAttributes<HTMLFormElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{}>;

export class SignInRoute extends Component<Props, State> {
  private inputField: React.RefObject<HTMLInputElement> = React.createRef();

  public componentDidMount() {
    this.props.actionGetUser();
    createSearchInputObservable(this.inputField, {}).subscribe((value: any) => {
      console.log(value);
    });
  }

  public render() {
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
      linkTo: () => push(`/`),
      ...auth.actions
    },
    dispatch
  );
};

const enhance = compose<React.ComponentClass<OwnProps>>(
  connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInRoute);
