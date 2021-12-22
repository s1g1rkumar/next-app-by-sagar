import Document, { Head,Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="el">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () => {
    return originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });
  };
  const initalProps = await Document.getInitialProps(ctx);
  return {
    ...initalProps,
    styles: [
      ...React.Children.toArray(initalProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
