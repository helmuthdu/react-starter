import { Component, type ReactNode } from 'react';
import './app-error.scss';

const T = {
  CONTACT_SUPPORT_BUTTON: 'Contact Support',
  CONTACT_SUPPORT_URL: 'https://support.example.com',
  ERROR_DESCRIPTION:
    'We are sorry, but something went wrong. Please try again later or contact support if the problem persists.',
  ERROR_DETAILS: 'Error Details',
  ERROR_TITLE: 'Something went wrong.',
  RELOAD_BUTTON: 'Reload Page',
};

export class AppError extends Component<Readonly<{ children: ReactNode }>, { error?: Error; hasError: boolean }> {
  static getDerivedStateFromError(error: Error) {
    return { error, hasError: true };
  }

  state: { error?: Error; hasError: boolean } = {
    error: undefined,
    hasError: false,
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-error">
          <div className="container">
            <div className="box">
              <div className="warning-icon">
                <svg aria-labelledby="errorIconTitle" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title id="errorIconTitle">Error Icon</title>
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                </svg>
              </div>

              <h1 className="heading">{T.ERROR_TITLE}</h1>
              <p className="description">{T.ERROR_DESCRIPTION}</p>

              {this.state.error?.message && (
                <div className="alert">
                  <h2 className="subheading">{T.ERROR_DETAILS}</h2>
                  <div className="error-details">
                    <strong>Message:</strong> {this.state.error.message}
                    {this.state.error.cause !== undefined && this.state.error.cause !== null && (
                      <>
                        <br />
                        <strong>Cause:</strong> <pre>{JSON.stringify(this.state.error.cause, null, 2)}</pre>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="button-group">
                <button className="button primary" onClick={window.location.reload} type="button">
                  {T.RELOAD_BUTTON}
                </button>
                <a className="button secondary" href={T.CONTACT_SUPPORT_URL} rel="noopener noreferrer" target="_blank">
                  {T.CONTACT_SUPPORT_BUTTON}
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
