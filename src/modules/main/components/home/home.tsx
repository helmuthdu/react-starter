import './home.css';
import { FormattedMessage } from 'react-intl';
import { MAIN_ROUTES, USER_ROUTES } from '../../../paths';
import logo from '../../assets/images/logo.svg';

type Props = { onLinkClick: (route: USER_ROUTES | MAIN_ROUTES) => void };
export const Home = (props: Props) => (
  <div className="app">
    <header className="app-header">
      <img alt="logo" className="app-logo" src={logo} />
      <p>
        Edit <code>src/app.tsx</code> and save to reload.
      </p>
      <a className="app-link" href="https://reactjs.org" rel="noopener noreferrer" target="_blank">
        <FormattedMessage id="LEARN_REACT" />
      </a>
      Navigate to
      <div
        className="app-link"
        onClick={() => props.onLinkClick(MAIN_ROUTES.ABOUT)}
        onKeyDown={() => props.onLinkClick(MAIN_ROUTES.ABOUT)}
        title="go to about page">
        about page
      </div>
      or to
      <div
        className="app-link"
        onClick={() => props.onLinkClick(USER_ROUTES.SIGN_IN)}
        onKeyDown={() => props.onLinkClick(MAIN_ROUTES.ABOUT)}
        title="go to sign-in page">
        sign-in page
      </div>
    </header>
  </div>
);
