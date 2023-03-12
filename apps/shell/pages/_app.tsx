import Layout from "../components/Layout";
import { MantineProvider } from "@mantine/core";
export default function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}

MyApp.getInitialProps = () => ({});
