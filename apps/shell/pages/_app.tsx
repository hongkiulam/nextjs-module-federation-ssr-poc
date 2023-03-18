import { useState } from "react";
import { MantineProvider } from "@mantine/core";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Layout from "../components/Layout";

export default function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState || {}}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = () => ({});
