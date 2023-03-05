import { revalidate } from "@module-federation/nextjs-mf/utils";
import Document, { Html, Head, Main, NextScript } from "next/document";

export const NextDocument = () => {
  return (
    <Html>
      <Head />
      <body>
        <i>From _document in shared library</i>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

NextDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);

  // can be any lifecycle or implementation you want
  ctx?.res?.on("finish", () => {
    revalidate().then((shouldUpdate) => {
      console.log("finished sending response", shouldUpdate);
    });
  });

  return initialProps;
};
