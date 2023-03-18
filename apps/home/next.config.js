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
          shell: `shell@http://localhost:3000/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        exposes: {
          "./pages/index": "./pages/index",
        },
        shared: {
          "@emotion/": { singleton: true },
          "@tanstack/": { singleton: true },
        },
        extraOptions: { automaticAsyncBoundary: true },
      })
    );

    return config;
  },
};
