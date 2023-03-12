import { revalidate, FlushedChunks } from "@module-federation/nextjs-mf/utils";
import { flushChunks } from "@module-federation/node/utils";
import Document, { Html, Head, Main, NextScript } from "next/document";

export const NextDocument = (props) => {
  return (
    <Html>
      <Head>
        <FlushedChunks chunks={props.chunks} />
      </Head>
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
  const chunks = await flushChunks();
  // can be any lifecycle or implementation you want
  ctx?.res?.on("finish", () => {
    revalidate().then((shouldUpdate) => {
      console.log("finished sending response", shouldUpdate);
    });
  });
  console.log(chunks);

  return {
    ...initialProps,
    chunks,
  };
};
