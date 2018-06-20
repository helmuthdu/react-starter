import { disableLoading, enableLoading, toggleLoading } from './actions';
import { isLoading } from './getters';
import { uiReducer } from './reducer';
import { initialState } from './state';

describe('store -> UI', () => {
  it('should handle the initial state', () => {
    expect(uiReducer(initialState, {})).toEqual({ loadingCount: 0 });
  });

  it('should handle UI_ENABLE_LOADING', () => {
    expect(uiReducer(initialState, enableLoading())).toEqual({ loadingCount: 1 });
  });

  it('should handle UI_DISABLE_LOADING', () => {
    expect(uiReducer(initialState, disableLoading())).toEqual({ loadingCount: 0 });
  });

  it('should handle UI_TOGGLE_LOADING', () => {
    expect(uiReducer(initialState, toggleLoading())).toEqual({ loadingCount: 1 });
  });

  it('should check if is loading', () => {
    expect(isLoading({ loadingCount: 1 })).toEqual(true);
  });
});
