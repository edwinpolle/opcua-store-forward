import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: {
    index: "./src/index.ts",
    opcuaServerUtility:
      "./src/backend/opcua/opcua-server/utility/opcua-server.utility.ts",
  },
  output: {
    filename: "[name].js",
  },
  externals: {
    "node-opcua": "commonjs node-opcua",
  },
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
