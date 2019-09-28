import React, { Component, HTMLAttributes, MouseEvent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { Subject } from 'rxjs';
import { searchInputObservable } from '../../../../helpers';
import { AppState } from '../../../../stores';
import { SignIn } from '../../components/sign-in/sign-in.component';
import { DefaultLayout } from '../../layouts/default/default.layout';
import { user } from '../../stores';

type StateProps = Readonly<{
  name: string;
}>;

type DispatchProps = user.Actions;

type OwnProps = HTMLAttributes<HTMLFormElement>;

export type Props = StateProps & DispatchProps & OwnProps;

type State = Readonly<{
  username$: Subject<string>;
}>;

class SignInPage extends Component<Props, State> {
  public state: State = {
    username$: new Subject<string>()
  };

  public componentDidMount() {
    this.props.actionGetUser();
    searchInputObservable(this.state.username$, {}).subscribe((value: any) => {
      console.log('ON_CHANGE_WITH_OBSERVABLE: ', value);
    });
  }

  public render() {
    return (
      <DefaultLayout>
        <SignIn
          onSubmit={values => console.log(values)}
          onChange={this.handleChange}
          onClick={this.handleClick}
          name={this.props.name}
        />
      </DefaultLayout>
    );
  }

  private handleClick = (evt: MouseEvent) => {
    evt.preventDefault();
  };

  private handleChange = (evt: SyntheticEvent<HTMLInputElement>) => {
    evt.preventDefault();
    this.state.username$.next(evt.currentTarget.value);
  };
}

const mapStateToProps = (state: AppState): StateProps => ({ name: state.user.name });

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return bindActionCreators(
    {
      ...user.actions
    },
    dispatch
  );
};

const enhance = compose(
  connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(SignInPage);
