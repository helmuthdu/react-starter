import { AppState } from '../../../../modules';
import { actions } from '../actions';
import { getters } from '../getters';
import { Action, reducer } from '../reducer';
import { initialState } from '../state';
import { ActionType } from '../types';

describe('store/ui -> reducer', () => {
  it('should handle the initial state', () => {
    expect(reducer(initialState, {} as Action)).toEqual({ count: 0 });
  });

  it(`should handle ${ActionType.LOADING_ENABLE_LOADING}`, () => {
    expect(reducer(initialState, actions.actionEnableLoading())).toEqual({ count: 1 });
  });

  it(`should handle ${ActionType.LOADING_DISABLE_LOADING}`, () => {
    expect(reducer(initialState, actions.actionDisableLoading())).toEqual({ count: 0 });
  });

  it(`should handle ${ActionType.LOADING_TOGGLE_LOADING}`, () => {
    expect(reducer(initialState, actions.actionToggleLoading())).toEqual({ count: 1 });
  });

  it('should check if is loading', () => {
    expect(getters.isLoading({ loading: { count: 1 } } as AppState)).toEqual(true);
  });
});
