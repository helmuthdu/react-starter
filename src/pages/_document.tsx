import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document<any> {
  static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps & Record<string, any>> {
    const props = await super.getInitialProps(context);
    const {
      req: { locale }
    } = context as any;
    return {
      ...props,
      locale
    };
  }

  public render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
