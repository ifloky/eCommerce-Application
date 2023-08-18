const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
//  const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  // eslint-disable-next-line no-param-reassign
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: 'development',
  entry: './index',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][hash][ext]'
  },
  resolve: {
    extensions: ['.js', '.ts'],
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      path: path.resolve(__dirname, 'index.html'),
      title: 'eCommerce',
      favicon: './src/assets/image/icons/favicon.ico',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //  new Dotenv(),
    new MiniCssExtractPlugin(),
    new EslintWebpackPlugin({ extensions: 'ts' }),
    new webpack.DefinePlugin(envKeys),
  ],
  stats: {
    children: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader'
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader'
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ca]ss$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    hot: true,
    compress: true,
    port: 2023,
    historyApiFallback: true
  }
}