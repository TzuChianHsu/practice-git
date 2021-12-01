import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

// 適合在 Document 中設定的是像 google analytics、google font 這類所有的頁面都會用到的函式庫，或是全域 bootstrap css 等，在伺服器端處理完畢後，才將 HTML 回傳給使用者。
export default class MyDocument extends Document {
    
    static async getInitialProps(ctx: DocumentContext) { 

    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    // 處理 server-side rendering className 時頁面中樣式預載入的問題
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }

  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

}
