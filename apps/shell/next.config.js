const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

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
        },
        remotes: {
          home: `home@http://localhost:3001/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        shared: {
          "@emotion/": {
            singleton: true,
          },
        },
        extraOptions: { automaticAsyncBoundary: true },
      })
    );

    return config;
  },
};
