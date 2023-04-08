const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./_app": "./pages/_app",
          "./components/Container": "./components/Container",
        },
        remotes: {
          home: `home@${process.env.HOME_URL}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          product: `product@${process.env.PRODUCT_URL}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        shared: {
          "@mantine/core": { singleton: true },
          "@tanstack/": { singleton: true },
        },
        extraOptions: { automaticAsyncBoundary: true },
      })
    );

    return config;
  },
};
