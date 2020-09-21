import Link from 'next/link';
import React from 'react';
import { ROOT_PAGES, USER_PAGES } from '../../../pages';

import styles from './home.module.scss';

export const Home = () => (
  <div className={styles.app}>
    <header className={styles.appHeader}>
      <img src="/static/assets/images/logo.svg" className={styles.appLogo} alt="logo" />
      <p>
        Edit <code>src/app.js</code> and save to reload.
      </p>
      <a className={styles.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      Navigate to
      <Link href={ROOT_PAGES.ABOUT}>
        <a className={styles.appLink} title="go to about page">
          about page
        </a>
      </Link>
      or to
      <Link href={USER_PAGES.SIGN_IN}>
        <a className={styles.appLink} title="go to sign-in page">
          sign-in page
        </a>
      </Link>
    </header>
  </div>
);
