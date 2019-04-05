import { shallow } from 'enzyme';
import React from 'react';
import { Component } from 'react';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal'
};

interface Props {
  onClick: () => void;
  to: string;
}

interface State {
  className: string;
}

class Link extends Component<Props, State> {
  public readonly state: State = {
    className: STATUS.NORMAL
  };

  public handleMouseEnter = () => {
    this.setState({ className: STATUS.HOVERED });
  };

  public handleMouseLeave = () => {
    this.setState({ className: STATUS.NORMAL });
  };

  public render() {
    const { to, children, onClick } = this.props;

    return (
      <a
        className={this.state.className}
        href={to || '#'}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={onClick}>
        {children}
      </a>
    );
  }
}

describe('component -> Link', () => {
  const props = {
    onClick: jest.fn(),
    to: 'http://www.facebook.com'
  };

  const wrapper = shallow(<Link {...props}>Facebook</Link>);
  const wrapperInstance = wrapper.instance() as Link;

  it('should match snapshot', () => {
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
    expect(wrapperInstance.props.onClick).toHaveBeenCalled();
  });

  it('should change state onMouseEnter called', () => {
    wrapperInstance.handleMouseEnter();
    expect(wrapperInstance.state.className).toBe(STATUS.HOVERED);
  });

  it('should change state onMouseLeave called', () => {
    wrapperInstance.handleMouseLeave();
    expect(wrapperInstance.state.className).toBe(STATUS.NORMAL);
  });
});
