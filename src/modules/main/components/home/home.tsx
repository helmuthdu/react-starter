import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { MAIN_PAGES, USER_PAGES } from '../../../pages';
import styles from './home.module.scss';

export const Home = () => (
  <div className={styles.app}>
    <header className={styles.appHeader}>
      <Image src="/static/assets/images/logo.svg" className={styles.appLogo} alt="logo" height="840" width="595" />
      <p>
        Edit <code>src/app.js</code> and save to reload.
      </p>
      <a className={styles.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        <FormattedMessage id="LEARN_REACT" />
      </a>
      Navigate to
      <Link href={MAIN_PAGES.ABOUT} className={styles.appLink} title="go to about page">
        about page
      </Link>
      or to
      <Link href={USER_PAGES.SIGN_IN} className={styles.appLink} title="go to sign-in page">
        sign-in page
      </Link>
    </header>
  </div>
);
