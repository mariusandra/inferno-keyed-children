const webpack = require('webpack')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

var config = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './app'),
  entry: {
    common: [
      'babel-polyfill', 'react',
      './index.js'
    ],
    homepage: [
      './scenes/homepage/scene.js'
    ],
    todos: [
      './scenes/todos/scene.js'
    ]
  },
  output: {
    path: path.join(__dirname, './static'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style',
          'css',
          'postcss'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: (isProd ? [] : ['react-hot']).concat([
          'babel-loader'
        ])
      },
      {
        test: /\.(png|jpg)$/,
        // inline base64 URLs for <=8k images, direct URLs for the rest
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./app'),
      'node_modules'
    ],
    alias: {
      '~': path.join(__dirname, './app'),
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat'
    }
  },
  postcss: function () {
    return [require('autoprefixer'), require('precss')];
  },
  plugins: [
     new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      filename: 'common.bundle.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ],
  devServer: {
    contentBase: './app'
    // hot: true
  }
}

// development mode
if (!isProd) {
  Object.keys(config.entry).forEach(function (k) {
    config.entry[k].unshift(
      'webpack-dev-server/client?http://0.0.0.0:2000',
      'webpack/hot/only-dev-server'
    )
  })
}

module.exports = config
