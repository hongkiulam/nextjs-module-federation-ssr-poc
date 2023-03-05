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
          "./_document": "./pages/_document",
        },
        remotes: {
          home: `home@http://localhost:3001/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
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

// _app.js or some other file in as high up in the app (like next's new layouts)
// this ensures various parts of next.js are imported and "used" somewhere so that they wont be tree shaken out
// note: this is optional in the latest release, as it is auto-injected by NextFederationPlugin now
require("@module-federation/nextjs-mf/src/include-defaults");
