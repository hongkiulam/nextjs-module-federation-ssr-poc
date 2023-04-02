const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "product",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          shell: `shell@http://localhost:3000/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          home: `home@http://localhost:3001/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        exposes: {
          "./pages/index": "./pages/index",
          "./pages/cart": "./pages/cart",
          "./lib/components/ProductCard": "./lib/components/ProductCard",
          "./lib/state/cart": "./lib/state/cart",
          "./lib/data/product": "./lib/data/product",
        },
        shared: {
          "@mantine/core": { singleton: true },
          "@tanstack/": { singleton: true },
          jotai: { singleton: true },
        },
        extraOptions: { automaticAsyncBoundary: true },
      })
    );

    return config;
  },
};
