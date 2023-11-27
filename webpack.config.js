
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        type: 'asset/source',
        generator: {
          filename: 'assets/[name]-[contenthash].[ext]',
        }
      },

      {
        // Load SCSS files for Angular components
        test: /\.component\.scss$/,
        exclude: /node_modules/,
        use: [
          'to-string-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.css$/,
        use: ['to-string-loader', 'style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(
    {
      template: './src/index.html',
      chunks: ['main'],
      filename: './index.html',
    },
  )],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    open: true,
    devMiddleware: {
      writeToDisk: true
    }
  },
};
