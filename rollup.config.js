import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import sourcemaps from "rollup-plugin-sourcemaps";
import visualizer from "rollup-plugin-visualizer";

const banner = `/** @license ms-rest-browserauth
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */`;

/**
 * @type {import('rollup').RollupFileOptions}
 */
const config = {
  input: './es/lib/index.js',
  external: ["@azure/ms-rest-js"],
  output: {
    file: "./dist/msAuth.js",
    format: "umd",
    name: "msAuth",
    sourcemap: true,
    globals: {
      "@azure/ms-rest-js": "msRest"
    },
    banner
  },
  plugins: [
    nodeResolve({ module: true }),
    commonjs(),
    sourcemaps(),
    visualizer({ filename: "dist/node-stats.html", sourcemap: true }),
    json()
  ]
}

export default config;
