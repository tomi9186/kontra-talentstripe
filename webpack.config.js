const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');

const isProd = process.env.NODE_ENV === 'production';
const srcPath = path.join(__dirname, 'src');

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: './src/js/main.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext][query]',
  },
  devtool: isProd ? false : 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    hot: true,
    port: 8080,
    watchFiles: ['src/**/*'],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: !isProd },
          },
          {
            loader: 'sass-loader',
            options: { 
              sourceMap: !isProd,
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    minimize: isProd,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: isProd ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),
    ...(isProd
      ? [
          new PurgeCSSPlugin({
            paths: glob.sync(srcPath + '/**/*', { nodir: true }),
            safelist: {
              standard: [
                'show', 'showing', 'hiding', 'hide',
                'collapsing', 'collapse', 'collapsed',
                'modal-backdrop', 'modal-open',
                'offcanvas-backdrop',
                'active', 'disabled', 'fade',
              ],
              deep: [
                /^modal/, /^offcanvas/, /^navbar/,
                /^dropdown/, /^collapse/, /^btn/,
                /^nav-/, /^carousel/, /^accordion/,
              ],
              greedy: [/data-bs-/],
            },
          }),
        ]
      : []),
  ],
};
