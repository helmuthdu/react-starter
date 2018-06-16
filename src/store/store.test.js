import store from './index';
describe('store', () => {
  it('should create a initial store', () => {
    process.env.NODE_ENV = 'development';
    expect(store).toBeDefined();
  });
});
