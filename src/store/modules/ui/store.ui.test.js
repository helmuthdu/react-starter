import { disableLoading, enableLoading } from './actions';
import { uiReducer } from './reducer';

describe('store -> UI', () => {
  it('should handle the initial state', () => {
    expect(uiReducer(undefined, {})).toEqual({ isLoading: false });
  });
  it('should handle UI_ENABLE_LOADING', () => {
    expect(uiReducer({}, enableLoading())).toEqual({ isLoading: true });
  });
  it('should handle UI_DISABLE_LOADING', () => {
    expect(uiReducer({}, disableLoading())).toEqual({ isLoading: false });
  });
});
