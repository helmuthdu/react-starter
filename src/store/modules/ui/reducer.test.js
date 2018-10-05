import { disableLoading, enableLoading, toggleLoading } from './actions';
import { isLoading } from './getters';
import { reducer } from './reducer';
import { initialState } from './state';
import { UI_DISABLE_LOADING, UI_ENABLE_LOADING, UI_TOGGLE_LOADING } from './types';

describe('store -> UI', () => {
  it('should handle the initial state', () => {
    expect(reducer(initialState, {})).toEqual({ loadingCount: 0 });
  });

  it(`should handle ${UI_ENABLE_LOADING}`, () => {
    expect(reducer(initialState, enableLoading())).toEqual({ loadingCount: 1 });
  });

  it(`should handle ${UI_DISABLE_LOADING}`, () => {
    expect(reducer(initialState, disableLoading())).toEqual({ loadingCount: 0 });
  });

  it(`should handle ${UI_TOGGLE_LOADING}`, () => {
    expect(reducer(initialState, toggleLoading())).toEqual({ loadingCount: 1 });
  });

  it('should check if is loading', () => {
    expect(isLoading({ loadingCount: 1 })).toEqual(true);
  });
});
