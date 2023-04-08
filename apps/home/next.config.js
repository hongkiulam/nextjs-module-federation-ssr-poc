const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          shell: `shell@${process.env.SHELL_URL}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
          product: `product@${process.env.PRODUCT_URL}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        exposes: {
          "./pages/index": "./pages/index",
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
