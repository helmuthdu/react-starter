import { disableLoading, enableLoading, toggleLoading } from '../actions';
import { isLoading } from '../getters';
import { Actions, reducer } from '../reducer';
import { initialState } from '../state';
import { ActionType } from '../types';

describe('store/ui -> reducer', () => {
  it('should handle the initial state', () => {
    expect(reducer(initialState, {} as Actions)).toEqual({ loading: 0 });
  });

  it(`should handle ${ActionType.UI_ENABLE_LOADING}`, () => {
    expect(reducer(initialState, enableLoading())).toEqual({ loading: 1 });
  });

  it(`should handle ${ActionType.UI_DISABLE_LOADING}`, () => {
    expect(reducer(initialState, disableLoading())).toEqual({ loading: 0 });
  });

  it(`should handle ${ActionType.UI_TOGGLE_LOADING}`, () => {
    expect(reducer(initialState, toggleLoading())).toEqual({ loading: 1 });
  });

  it('should check if is loading', () => {
    expect(isLoading({ loading: 1 })).toEqual(true);
  });
});
