const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const mode = process.env.NODE_ENV || 'production';

module.exports = {
  mode,
  entry: './src',
  output: {
    publicPath: 'auto',
  },
  devtool: 'source-map',
  optimization: {
    minimize: mode === 'production',
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
      name: 'component_app',
      filename: 'component_app.js',
      shared: {
        react: {
          import: 'react',
          shareKey: 'react',
          shareScope: 'default',
        },
        'react-dom': {}
      },
      exposes: {
        './SayHelloFromC': './src/app',
      },
    }),
  ],
};
