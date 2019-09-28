import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document<any> {
  static async getInitialProps(context: any) {
    const props = await super.getInitialProps(context);
    const {
      req: { locale, localeDataScript }
    } = context;
    return {
      ...props,
      locale,
      localeDataScript
    };
  }

  public render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
