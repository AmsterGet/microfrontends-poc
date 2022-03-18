const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode,
  entry: './src',
  output: {
    publicPath: 'auto',
    clean: true,
    crossOriginLoading: 'anonymous',
  },
  devtool: 'source-map',
  optimization: {
    minimize: mode === 'production',
    chunkIds: 'named',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'library_app',
      filename: 'lib_app.js',
      shared: {
        react: {
          import: 'react',
          shareKey: 'react',
          shareScope: 'default',
        },
        'react-dom': {}
      },
      exposes: {
        './SayHelloFromB': './src/app',
        './SayHelloFromB2': './src/say',
      },
    }),
    new SubresourceIntegrityPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      hashLoading: 'lazy',
    }),
  ],
};
