import Link from 'next/link';
import React from 'react';
import { ROOT_ROUTES, USER_ROUTES } from '../../../routes';

import styles from './home.scss';

type Props = {
  onImageClick: () => void;
};
export const Home = (props: Props) => (
  <div className={styles.app}>
    <header className={styles.appHeader} onClick={props.onImageClick}>
      <img src="/static/assets/images/logo.svg" className={styles.appLogo} alt="logo" />
      <p>
        Edit <code>src/app.js</code> and save to reload.
      </p>
      <a className={styles.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      Navigate to
      <Link href={ROOT_ROUTES.ABOUT}>
        <a className={styles.appLink} title="go to about page">
          about page
        </a>
      </Link>
      or to
      <Link href={USER_ROUTES.SIGN_IN}>
        <a className={styles.appLink} title="go to sign-in page">
          sign-in page
        </a>
      </Link>
    </header>
  </div>
);
