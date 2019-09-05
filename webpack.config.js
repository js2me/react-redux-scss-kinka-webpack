const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const ENTRY_FILENAME = 'index.js';
const SOURCE_PATH = 'src';
const ALIAS_PREFIX = '@';
const PATH_ALIASES = [
  'helpers',
  'components',
  'store',
  'assets',
  'styles',
  'api',
  'routes'
];

module.exports = {
  devtool: !isProduction && 'cheap-module-source-map',
  cache: !isProduction,
  entry: `./${SOURCE_PATH}/${ENTRY_FILENAME}`,
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash:6].js'
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    publicPath: '/'
  },
  resolve: {
    alias: PATH_ALIASES.reduce(
      (aliases, alias) => ({
        ...aliases,
        [`${ALIAS_PREFIX}${alias}`]: path.resolve(
          __dirname,
          `${SOURCE_PATH}/${alias}`
        )
      }),
      {}
    ),
    extensions: ['.js', '.jsx', '.scss', '.json', '.css']
  },
  optimization: {
    minimizer: isProduction ? [new TerserPlugin()] : []
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: isProduction
                  ? '[hash:base64:4]'
                  : '[path][name]__[local]___[hash:base64:5]'
              },
              sourceMap: !isProduction
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery',
    //   'window.$': 'jquery'
    // }),
    !isProduction && new ErrorOverlayPlugin(),
    !isProduction &&
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // include specific files based on a RegExp
        include: /dir/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd()
      }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      inject: false,
      template: path.resolve(__dirname, './src/template.ejs'),
      filename: 'index.html',
      favicon: path.resolve(__dirname, './src/assets/icons/favicon.png'),
      appMountId: 'app',
      title: 'App',
      mobile: true,
      minify: {
        html5: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackHarddiskPlugin(),
    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: !isProduction,
      sourceMap: !isProduction
    })
  ].filter(Boolean)
};

// if (!isProduction) {
//   module.exports.plugins.push();
// }

// if (isProduction) {
//   module.exports.plugins.push(
//     new PostCSSAssetsPlugin({
//       test: /\.css$/,
//       log: true,
//       plugins: [require('autoprefixer'), require('cssnano')]
//     })
//   );
// }
