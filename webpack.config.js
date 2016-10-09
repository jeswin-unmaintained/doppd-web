var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./dist/app-browser.js",
  output: {
    path: path.join(__dirname, "dist/static"),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      "isotropy": "isotropy-in-dom",
      "http": "isotropy-http-in-browser",
      "isotropy-adapter-react": "isotropy-adapter-react-in-dom"
    }
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
}
