// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See LICENSE in the project root for license information.

import * as path from "path";
import webpackMiddleware from "webpack-dev-middleware";
import webpack = require("webpack");
import express = require("express");
import testconfig = require("../webpack.testconfig");

const port = parseInt(process.env.PORT) || 3003;
const app = express();

if (process.argv.indexOf("--no-webpack") === -1) {
    app.use(webpackMiddleware(webpack(testconfig), {
        publicPath: "/"
    }));
}

app.use(express.static(path.join(__dirname, "../")));

app.listen(port, function() {
    console.log(`ms-rest-browserauth testserver listening on port ${port}...`);
});
