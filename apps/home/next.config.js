const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

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
          // must be eager because it's loaded in _document (not sure of the underlying reason)
          "next-document": {
            eager: true,
            singleton: true,
          },
          // react and react/ must be eager because next-document is eager
          react: {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
          "react/": {
            singleton: true,
            requiredVersion: false,
            eager: true,
          },
        },
      })
    );

    return config;
  },
};
