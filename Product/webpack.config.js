const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const path = require("path");
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "isomorphic-mf",
    projectName: "product",
    webpackConfigEnv,
  });

  const serverConfig = singleSpaDefaults({
    orgName: "isomorphic-mf",
    projectName: "product",
    webpackConfigEnv,
  });

  defaultConfig.plugins = defaultConfig.plugins.filter(
    (p) => p.constructor.name !== "CleanWebpackPlugin"
  );
  serverConfig.plugins = serverConfig.plugins.filter(
    (p) => p.constructor.name !== "CleanWebpackPlugin"
  );

  return [
    webpackMerge.smart(defaultConfig, {}),
    webpackMerge.smart(serverConfig, {
      // modify the webpack config however you'd like to by adding to this object
      target: "node",
      mode: "development",
      entry: path.resolve(process.cwd(), "src/node-entry.js"),
      output: {
        library: "mf",
        libraryTarget: "var",
        filename: "server.mjs",
      },
      module: {
        rules: [
          // CSS rules
          {
            test: /\.(s(a|c)ss)$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: "file-loader",
          },
        ],
      },
      externals: defaultConfig.externals.concat(/react-dom\/.+/),
      plugins: [
        new EsmWebpackPlugin({
          moduleExternals: true,
        }),
      ],
    }),
  ];
};
