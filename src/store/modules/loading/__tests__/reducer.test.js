import { actions } from '../actions';
import { getters } from '../getters';
import { reducer } from '../reducer';
import { initialState } from '../state';
import { ActionType } from '../types';

describe('store/ui -> reducer', () => {
  it('should handle the initial state', () => {
    expect(reducer(initialState, {})).toEqual({ count: 0 });
  });

  it(`should handle ${ActionType.UI_ENABLE_LOADING}`, () => {
    expect(reducer(initialState, actions.actionEnableLoading())).toEqual({ count: 1 });
  });

  it(`should handle ${ActionType.UI_DISABLE_LOADING}`, () => {
    expect(reducer(initialState, actions.actionDisableLoading())).toEqual({ count: 0 });
  });

  it(`should handle ${ActionType.UI_TOGGLE_LOADING}`, () => {
    expect(reducer(initialState, actions.actionToggleLoading())).toEqual({ count: 1 });
  });

  it('should check if is loading', () => {
    expect(getters.isLoading({ loading: { count: 1 } })).toEqual(true);
  });
});
