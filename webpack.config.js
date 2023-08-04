const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][hash][ext]'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'eCommerce project',
      favicon: './assets/image/icons/favicon.svg'
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new EslintWebpackPlugin({ extensions: 'ts' })
  ],
  devServer: {
    hot: true,
    compress: true,
    port: 2023
  }
}