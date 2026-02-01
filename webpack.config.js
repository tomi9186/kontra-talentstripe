const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob');

const isProd = process.env.NODE_ENV === 'production';
const srcPath = path.join(__dirname, 'src');

// Pronađi sve HTML datoteke u src/
const htmlFiles = fs.readdirSync(srcPath).filter(file => file.endsWith('.html'));

// Kreiraj HtmlWebpackPlugin za svaki HTML file
const htmlPlugins = htmlFiles.map(file => {
  return new HtmlWebpackPlugin({
    template: `./src/${file}`,
    filename: file,
    minify: isProd ? {
      collapseWhitespace: true,
      removeComments: true,
    } : false,
  });
});

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: './src/js/main.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,
    assetModuleFilename: 'assets/[name][ext][query]',
  },
  devtool: isProd ? false : 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
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
                loadPaths: ['node_modules'],
              },
              warnRuleAsWarning: false,
              implementation: require('sass'),
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
    ...htmlPlugins,
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
  ignoreWarnings: [
    {
      module: /sass-loader/,   // ignorira warning iz sass-loadera
      message: /@import rules are deprecated/,
    },
  ],
};
