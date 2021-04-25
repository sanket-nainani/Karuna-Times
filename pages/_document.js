import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import ThemeManager from '../framework/src/utils/themeManager';

class MyDocument extends Document {
  render() {
    const themeObj = new ThemeManager('13c7cd', '#ffffff', '#ffffff', '#2af499', '#0ab3e5', 'Montserrat');

    return (
      <Html style={themeObj.generateStyleObject()}>
        <Head />
        <body className={`custom_class`}>
          <Main />
          <NextScript />
          <div id="modal-root" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
