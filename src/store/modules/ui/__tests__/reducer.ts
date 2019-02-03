import { AppState } from '../../../../index';
import { actions } from '../actions';
import { isLoading } from '../getters';
import { Action, reducer } from '../reducer';
import { initialState } from '../state';
import { ActionType } from '../types';

describe('store/ui -> reducer', () => {
  it('should handle the initial state', () => {
    expect(reducer(initialState, {} as Action)).toEqual({ loading: 0 });
  });

  it(`should handle ${ActionType.UI_ENABLE_LOADING}`, () => {
    expect(reducer(initialState, actions.enableLoading())).toEqual({ loading: 1 });
  });

  it(`should handle ${ActionType.UI_DISABLE_LOADING}`, () => {
    expect(reducer(initialState, actions.disableLoading())).toEqual({ loading: 0 });
  });

  it(`should handle ${ActionType.UI_TOGGLE_LOADING}`, () => {
    expect(reducer(initialState, actions.toggleLoading())).toEqual({ loading: 1 });
  });

  it('should check if is loading', () => {
    expect(isLoading({ ui: { loading: 1 } } as AppState)).toEqual(true);
  });
});
