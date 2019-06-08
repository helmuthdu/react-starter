import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
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
        data-testid="link-btn"
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

  const { getByText, getByTestId, asFragment } = render(<Link {...props}>Facebook</Link>);

  it('should match snapshot', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('should have text value', () => {
    // @ts-ignore
    expect(getByText(/Facebook/i)).toBeInTheDocument();
  });

  it('should trigger onClick method', () => {
    fireEvent.click(getByTestId('link-btn'));
    expect(props.onClick).toHaveBeenCalled();
  });

  it('should change state onMouseEnter called', () => {
    fireEvent.mouseEnter(getByTestId('link-btn'));
    // @ts-ignore
    expect(getByTestId('link-btn')).toHaveClass(STATUS.HOVERED);
  });

  it('should change state onMouseLeave called', () => {
    fireEvent.mouseLeave(getByTestId('link-btn'));
    // @ts-ignore
    expect(getByTestId('link-btn')).toHaveClass(STATUS.NORMAL);
  });
});
