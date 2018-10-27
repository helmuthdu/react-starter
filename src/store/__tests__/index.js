import createStore from '..';

describe('store', () => {
  const { store } = createStore();

  it('should create a initial store', () => {
    process.env.NODE_ENV = 'development';
    expect(store).toBeDefined();
  });
});
