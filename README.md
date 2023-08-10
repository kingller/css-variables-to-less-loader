# css-variables-to-less-loader
A loader for webpack. Compiles CSS variables to less variables for support IE.

## Install

```bash
npm install css-variables-to-less-loader
``` 

## Usage

Add the loader to your `webpack` config. For example:

<strong>webpack.config.js</strong>

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
          {
            loader: 'css-variables-to-less-loader',
            options: {
                // the file include the less variables you want to replace the CSS variables
                // for example, replace var(--primary) with @primary for all less files, if the file contains @primary variable
                varFile: path.join(__dirname, 'src/css/color-variables.less'),
            },
          },
        ],
      },
    ],
  },
};
```
