import { revalidate, FlushedChunks } from "@module-federation/nextjs-mf/utils";
import { flushChunks } from "@module-federation/node/utils";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

type AdditionalProps = {
  chunks: string[];
};

export class NextDocument extends Document<AdditionalProps> {
  static getInitialProps = async (
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & AdditionalProps> => {
    const initialProps = await Document.getInitialProps(ctx);
    const chunks = await flushChunks();
    // can be any lifecycle or implementation you want
    ctx?.res?.on("finish", () => {
      revalidate().then((shouldUpdate) => {
        console.log("finished sending response", shouldUpdate);
      });
    });

    return {
      ...initialProps,
      chunks,
    };
  };

  render() {
    return (
      <Html>
        <Head>
          <FlushedChunks chunks={this.props.chunks} />
        </Head>
        <body>
          <i>From _document in shared library</i>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
