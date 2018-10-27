import { shallow } from 'enzyme';
import React, { Component } from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal'
};

class Link extends Component {
  state = {
    class: STATUS.NORMAL
  };

  _onMouseEnter = () => {
    this.setState({ class: STATUS.HOVERED });
  };

  _onMouseLeave = () => {
    this.setState({ class: STATUS.NORMAL });
  };

  render() {
    return (
      <a
        className={this.state.class}
        href={this.props.to || '#'}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this.props.onClick}>
        {this.props.children}
      </a>
    );
  }
}

describe('component -> Link', () => {
  const props = {
    to: 'http://www.facebook.com',
    onClick: jest.fn()
  };

  const wrapper = shallow(<Link {...props}>Facebook</Link>);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have text value', () => {
    expect(wrapper.text()).toEqual('Facebook');
  });

  it('should trigger onClick method', () => {
    wrapper
      .find('a')
      .at(0)
      .simulate('click');
    expect(wrapper.instance().props.onClick).toBeCalled();
  });

  it('should change state onMouseEnter called', () => {
    wrapper.instance()._onMouseEnter();
    expect(wrapper.instance().state.class).toBe(STATUS.HOVERED);
  });

  it('should change state onMouseLeave called', () => {
    wrapper.instance()._onMouseLeave();
    expect(wrapper.instance().state.class).toBe(STATUS.NORMAL);
  });
});
