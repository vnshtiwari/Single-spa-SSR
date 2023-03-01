const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "isomorphic-mf",
    projectName: "header",
    webpackConfigEnv,
    argv,
  });

  const serverConfig = singleSpaDefaults({
    orgName: "isomorphic-mf",
    projectName: "header",
    webpackConfigEnv,
  });

  defaultConfig.plugins = defaultConfig.plugins.filter(
    (p) => p.constructor.name !== "CleanWebpackPlugin"
  );
  serverConfig.plugins = serverConfig.plugins.filter(
    (p) => p.constructor.name !== "CleanWebpackPlugin"
  );

  console.log(defaultConfig);

  return [
    merge(defaultConfig, {
      // modify the webpack config however you'd like to by adding to this object
    }),

    merge(serverConfig, {
      target: "node",
      mode: "development",
      entry: path.resolve(process.cwd(), "src/node-entry.js"),
      output: {
        // libraryTarget: "system",
        // filename: "server.mjs",
        libraryTarget: "system",
        filename: "server.mjs",
      },
      externals: defaultConfig.externals.concat(/react-dom\/.+/),
      optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin()],
      },
    }),
  ];
};
