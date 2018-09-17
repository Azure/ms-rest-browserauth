import * as webpack from 'webpack';
import * as path from 'path';

const config: webpack.Configuration = {
  entry: './lib/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'msAuthBundle.js',
    path: __dirname,
    libraryTarget: 'var',
    library: 'msAuth'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|test)/,
        options: { configFile: path.join(__dirname, './tsconfig.es.json') }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  node: {
    fs: false,
    net: false,
    path: false,
    dns: false,
    tls: false,
    tty: false,
    v8: false,
    Buffer: false,
    process: false,
    stream: false
  }
};

export = config;
