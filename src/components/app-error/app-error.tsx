import { Component, type ErrorInfo, type ReactNode } from 'react';

export class AppError extends Component<{ children: ReactNode }> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.info(errorInfo);
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
